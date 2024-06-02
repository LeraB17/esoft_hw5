import React, { FC, useEffect, useMemo, useState } from "react";
import styles from "./FilmPage.module.css";
import { useParams } from "react-router-dom";
import Loader from "#components/UI/Loader/Loader";
import { getDateNowToString, getSimilarFilms } from "#utils/dataFilterFunctions";
import CommentForm from "#components/CommentForm/CommentForm";
import CommentsList from "#components/CommentsList/CommentsList";
import FilmInfo from "#components/FilmInfo/FilmInfo";
import { IFilm, IFilmPage } from "#interfaces/IFilm";
import { IComment } from "#interfaces/IComment";
import { useAppSelector } from "#hooks/redux";
import { filmsAPI } from "#services/FilmsService";
import { commentsAPI } from "#services/ComentsService";
import { userAPI } from "#services/UserService";

const FilmPage: FC = () => {
    const params = useParams();
    const [currentFilm, setCurrentFilm] = useState<IFilmPage | undefined>(undefined);

    const { userId } = useAppSelector((state) => state.user);

    const { data: films } = filmsAPI.useFetchFilmsQuery({});
    const { data: film, error: fetchError, isLoading: isLoadingFilm } = filmsAPI.useFetchFilmQuery(Number(params.id));
    const { data: comments } = commentsAPI.useFetchFilmCommentsQuery({ filmId: Number(params.id) });
    const [createComment, {}] = commentsAPI.useCreateCommentMutation();

    const { data: favoriteFilms, error: errorF, isLoading: isLoadingF } = userAPI.useFetchFavoritesFilmsQuery();
    const { data: watchLaterFilms, error: errorW, isLoading: isLoadingW } = userAPI.useFetchWatchLaterFilmsQuery();
    const [createFavoriteFilm, {}] = userAPI.useCreateFavoriteFilmMutation();
    const [createWatchLaterFilm, {}] = userAPI.useCreateWatchLaterFilmMutation();
    const [deleteFavoriteFilm, {}] = userAPI.useDeleteFavoriteFilmMutation();
    const [deleteWatchLaterFilm, {}] = userAPI.useDeleteWatchLaterFilmMutation();

    const similarFilms = useMemo(() => {
        if (films && film) {
            return getSimilarFilms(films, film);
        }
        return [];
    }, [films, film]);

    const loadFilm = () => {
        if (film && films && comments) {
            const dataWithSimilar = {
                ...film,
                similar: similarFilms,
                comments: comments,
            };
            setCurrentFilm(dataWithSimilar);
        }
    };

    useEffect(() => {
        loadFilm();
    }, [params, film, films, comments]);

    const handlerAddComment = async (value: string) => {
        if (value && comments && currentFilm) {
            const newComment: IComment = {
                id: comments?.length,
                filmId: currentFilm?.id,
                user: userId,
                text: value,
                date: getDateNowToString(),
            };

            await createComment(newComment);
        }
    };

    const checkIsFavorite = (filmId: number) => {
        return favoriteFilms?.find((film: IFilm) => film.id === filmId) ? true : false;
    };

    const checkIsWatchLater = (filmId: number) => {
        return watchLaterFilms?.find((film: IFilm) => film.id === filmId) ? true : false;
    };

    const handlerAddFavorite = async (filmId: number) => {
        const film = films?.find((film: IFilm) => film.id === filmId);
        if (film) {
            if (checkIsFavorite(filmId)) {
                await deleteFavoriteFilm(film);
            } else {
                await createFavoriteFilm(film);
            }
        }
    };

    const handlerWatchLater = async (filmId: number) => {
        const film = films?.find((film: IFilm) => film.id === filmId);
        if (film) {
            if (checkIsWatchLater(filmId)) {
                await deleteWatchLaterFilm(film);
            } else {
                await createWatchLaterFilm(film);
            }
        }
    };

    if (isLoadingFilm || isLoadingF || isLoadingW) {
        return <Loader />;
    }

    if (!currentFilm || fetchError || errorF || errorW) {
        return <div>Фильм не найден</div>;
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
