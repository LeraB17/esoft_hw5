import React, { useEffect, useState } from 'react';
import styles from './FilmPage.module.css';
import { useParams } from 'react-router-dom';
import { useFetching } from '#hooks/useFetching';
import Loader from '#components/UI/Loader/Loader';
import { getDateNowToString, getSimilarFilms } from '#utils/dataFilterFunctions';
import CommentForm from '#components/CommentForm/CommentForm';
import CommentsList from '#components/CommentsList/CommentsList';
import FilmInfo from '#components/FilmInfo/FilmInfo';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '#store/commentsSlice';
import { addFavoriteFilm, addWatchLaterFilm, removeFavoriteFilm, removeWatchLaterFilm } from '#store/userSlice';
import { fetchData } from '#store/filmsSlice';

const FilmPage = () => {
    const [currentFilm, setCurrentFilm] = useState({})
    const params = useParams();
    const { userId } = useSelector((state) => state.user);
    const { comments } = useSelector((state) => state.comments);
    const { data: films } = useSelector((state) => state.films);
    const { favoriteFilms, watchLaterFilms } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [fetchFilm, isLoadingFilm, fetchError] = useFetching(async () => {
        const responce = await fetch('https://raw.githubusercontent.com/LeraB17/esoft_hw5/data-branch/films.json');
        const data = await responce.json();
        dispatch(fetchData(data));

        const dataFilm = data.find((film) => film.id === Number(params.id));
        const dataComments = comments.filter((comment) => comment.filmId === dataFilm.id);

        const dataWithSimilar = {
            ...dataFilm,
            similar: getSimilarFilms(data, dataFilm),
            comments: dataComments,
        }

        setCurrentFilm(dataWithSimilar);
    });

    useEffect(() => {
        fetchFilm();
    }, [params])

    const handlerAddComment = (value) => {
        if (value) {
            const newComment = {
                id: comments?.length,
                filmId: currentFilm?.id,
                user: userId,
                text: value,
                date: getDateNowToString(),
            }
            setCurrentFilm((prev) => ({
                ...prev,
                comments: [newComment, ...prev.comments],
            }));

            dispatch(addComment(newComment));
        }
    }

    const checkIsFavorite = (filmId) => {
        return favoriteFilms.find((film) => film.id === filmId);
    }

    const checkIsWatchLater = (filmId) => {
        return watchLaterFilms.find((film) => film.id === filmId);
    }

    const handlerAddFavorite = (filmId) => {
        const film = films.find((film) => film.id === filmId);
        if (film) {
            if (checkIsFavorite(filmId)) {
                dispatch(removeFavoriteFilm(film.id));
            } else {
                dispatch(addFavoriteFilm(film));
            }
        }
    }

    const handlerWatchLater = (filmId) => {
        const film = films.find((film) => film.id === filmId);
        if (film) {
            if (checkIsWatchLater(filmId)) {
                dispatch(removeWatchLaterFilm(film.id));
            } else {
                dispatch(addWatchLaterFilm(film));
            }
        }
    }

    if (isLoadingFilm) {
        return <Loader />
    }

    if (!currentFilm || fetchError) {
        return <div>Фильм не найден :( {fetchError}</div>
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
            <CommentForm
                onClickSubmit={(value) => handlerAddComment(value)}
            />
            <CommentsList
                comments={currentFilm?.comments}
            />
        </div>
    );
};

export default FilmPage;