import React, { useEffect, useState } from 'react';
import styles from './FilmPage.module.css';
import { useParams } from 'react-router-dom';
import { useFetching } from '#hooks/useFetching';
import { filmsData } from '#store/filmsData';
import Loader from '#components/UI/Loader/Loader';
import { getDateNowToString, getSimilarFilms } from '#utils/dataFilterFunctions';
import CommentForm from '#components/CommentForm/CommentForm';
import CommentsList from '#components/CommentsList/CommentsList';
import FilmInfo from '#components/FilmInfo/FilmInfo';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '#store/commentsSlice';

const FilmPage = () => {
    const [currentFilm, setCurrentFilm] = useState({})
    const params = useParams();
    const { userId } = useSelector((state) => state.user);
    const { comments } = useSelector((state) => state.comments);
    const dispatch = useDispatch();

    const [fetchFilm, isLoadingFilm, fetchError] = useFetching(async () => {
        const data = filmsData.filter((film) => film.id === Number(params.id))[0];
        const dataComments = comments.filter((comment) => comment.filmId === data.id);

        const dataWithSimilar = {
            ...data,
            similar: getSimilarFilms(filmsData, data),
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

    const handlerAddFavorite = () => {

    }

    const handlerWatchLater = () => {

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
                onClickAddFavorite={handlerAddFavorite}
                onClickWatchLater={handlerWatchLater}
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