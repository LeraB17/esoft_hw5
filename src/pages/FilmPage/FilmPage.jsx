import React, { useEffect, useState } from 'react';
import styles from './FilmPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { useFetching } from '#hooks/useFetching';
import { filmsData } from '#store/filmsData';
import Loader from '#components/UI/Loader/Loader';
import { Card, ListGroup } from 'react-bootstrap';
import FavoritesIcon from '#assets/icons/bookmark.svg?react';
import WatchLaterIcon from '#assets/icons/time.svg?react';
import { getSimilarFilms } from '#utils/dataFilterFunctions';
import { FILM_PAGE } from '#utils/urls';

const FilmPage = () => {
    const [currentFilm, setCurrentFilm] = useState({})
    const params = useParams();

    const [fetchFilm, isLoadingFilm, fetchError] = useFetching(async () => {
        const data = filmsData.filter((film) => film.id === Number(params.id))[0];
        const dataWithSimilar = {
            ...data,
            similar: getSimilarFilms(filmsData, data),
        }

        setCurrentFilm(dataWithSimilar);
    });

    useEffect(() => {
        fetchFilm();
    }, [params])

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
        <Card>
            <Card.Header className='d-flex justify-content-between align-items-center fw-bolder fs-5'>
                <div>
                    {currentFilm?.name}
                </div>
                <div>
                    <FavoritesIcon
                        className={`me-2 ${styles.forAction}`}
                        width={30}
                        height={30}
                        stroke={"#1e1e1e"}
                        fill={"none"}
                        onClick={() => handlerAddFavorite()}
                    />
                    <WatchLaterIcon
                        className={styles.forAction}
                        width={30}
                        height={30}
                        fill={"#1e1e1e"}
                        onClick={() => handlerWatchLater()}
                    />
                </div>
            </Card.Header>
            <Card.Body className={styles.Content}>
                <ListGroup className={`list-group-flush border ${styles.Text}`}>
                    <ListGroup.Item className='fw-bolder'>Описание:</ListGroup.Item>
                    <ListGroup.Item>{currentFilm?.description}</ListGroup.Item>
                </ListGroup>
                <ListGroup className={`list-group-flush border ${styles.Text}`}>
                    <ListGroup.Item>
                        <span>Рейтинг:&nbsp;</span>
                        {currentFilm?.rating?.toFixed(1)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span>Тип:&nbsp;</span>
                        {currentFilm?.type}</ListGroup.Item>
                    <ListGroup.Item>
                        <span>Год(ы) выхода:&nbsp;</span>
                        {currentFilm?.year}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span>Жанры:&nbsp;</span>
                        {currentFilm?.genres?.map((item) => item.name).join(', ')}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span>В ролях:&nbsp;</span>
                        {currentFilm?.actors?.map((item) => item.name).join(', ')}
                        &nbsp;и др.
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup className='list-group-flush border'>
                    <ListGroup.Item className='fw-bolder'>Похожее по жанрам:</ListGroup.Item>
                    {
                        currentFilm?.similar?.map((film) => <Link key={film.id} to={FILM_PAGE.replace(':id', film.id)}>
                            <ListGroup.Item>
                                {film.name}
                            </ListGroup.Item>
                        </Link>)
                    }
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default FilmPage;