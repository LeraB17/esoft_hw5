import React, { FC, useEffect, useState } from "react";
import styles from "./FilmPage.module.css";
import { useParams } from "react-router-dom";
import { useFetching } from "#hooks/useFetching";
import Loader from "#components/UI/Loader/Loader";
import { getDateNowToString, getSimilarFilms } from "#utils/dataFilterFunctions";
import CommentForm from "#components/CommentForm/CommentForm";
import CommentsList from "#components/CommentsList/CommentsList";
import FilmInfo from "#components/FilmInfo/FilmInfo";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "#store/commentsSlice";
import { addFavoriteFilm, addWatchLaterFilm, removeFavoriteFilm, removeWatchLaterFilm } from "#store/userSlice";
import { fetchData } from "#store/filmsSlice";
import { IFilm, IFilmPage } from "#interfaces/IFilm";
import { IComment } from "#interfaces/IComment";

const defaultFilm: IFilmPage = {
    id: 0,
    name: "",
    year: "",
    description: "",
    actors: [],
    type: "фильм",
    rating: 0,
    genres: [],
    similar: [],
    comments: [],
};

const FilmPage: FC = () => {
    const [currentFilm, setCurrentFilm] = useState<IFilmPage>(defaultFilm);
    const params = useParams();
    const { userId } = useSelector((state) => state.user);
    const { comments } = useSelector((state) => state.comments);
    const { data: films } = useSelector((state) => state.films);
    const { favoriteFilms, watchLaterFilms } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [fetchFilm, isLoadingFilm, fetchError] = useFetching();

    const loadFilm = async (controller: AbortController) => {
        const responce = await fetch("https://raw.githubusercontent.com/LeraB17/esoft_hw5/data-branch/films.json", {
            signal: controller.signal,
        });
        let data: IFilm[] = await responce.json();

        dispatch(fetchData(data));

        const dataFilm = data.find((film: IFilm) => film.id === Number(params.id));

        if (!dataFilm) {
            throw new Error("несуществующий id");
        }

        const dataComments = comments.filter((comment: IComment) => comment.filmId === dataFilm.id);

        const dataWithSimilar = {
            ...dataFilm,
            similar: getSimilarFilms(data, dataFilm),
            comments: dataComments,
        };

        setCurrentFilm(dataWithSimilar);
    };

    useEffect(() => {
        let abortFetch: () => void;
        fetchFilm(loadFilm).then((abort) => {
            abortFetch = abort;
        });

        return () => {
            if (abortFetch) {
                abortFetch();
            }
        };
    }, [params]);

    const handlerAddComment = (value: string) => {
        if (value) {
            const newComment = {
                id: comments?.length,
                filmId: currentFilm?.id,
                user: userId,
                text: value,
                date: getDateNowToString(),
            };
            setCurrentFilm((prev: IFilmPage) => ({
                ...prev,
                comments: [newComment, ...prev.comments],
            }));

            dispatch(addComment(newComment));
        }
    };

    const checkIsFavorite = (filmId: number) => {
        return favoriteFilms.find((film: IFilm) => film.id === filmId);
    };

    const checkIsWatchLater = (filmId: number) => {
        return watchLaterFilms.find((film: IFilm) => film.id === filmId);
    };

    const handlerAddFavorite = (filmId: number) => {
        const film = films.find((film: IFilm) => film.id === filmId);
        if (film) {
            if (checkIsFavorite(filmId)) {
                dispatch(removeFavoriteFilm(film.id));
            } else {
                dispatch(addFavoriteFilm(film));
            }
        }
    };

    const handlerWatchLater = (filmId: number) => {
        const film = films.find((film: IFilm) => film.id === filmId);
        if (film) {
            if (checkIsWatchLater(filmId)) {
                dispatch(removeWatchLaterFilm(film.id));
            } else {
                dispatch(addWatchLaterFilm(film));
            }
        }
    };

    if (isLoadingFilm) {
        return <Loader />;
    }

    if (!currentFilm || fetchError) {
        return <div>Фильм не найден: {fetchError}</div>;
    }

    return (
        <div className={styles.FilmPage}>
            <FilmInfo
                film={currentFilm}
                isFavorite={checkIsFavorite(currentFilm?.id)}
                isWatchLater={checkIsWatchLater(currentFilm?.id)}
                onClickAddFavorite={(filmId) => handlerAddFavorite(filmId)}
                onClickWatchLater={(filmId) => handlerWatchLater(filmId)}
            />
            <CommentForm onClickSubmit={(value) => handlerAddComment(value)} />
            <CommentsList comments={currentFilm?.comments} />
        </div>
    );
};

export default FilmPage;
