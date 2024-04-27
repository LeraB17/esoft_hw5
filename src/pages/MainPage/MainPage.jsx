import React, { useEffect } from 'react';
import styles from './MainPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFailure, fetchDataStart, fetchDataSuccess } from '#store/filmsSlice';
import { filmsData } from '#store/filmsData';

const MainPage = () => {
    const { loading, data: films, error } = useSelector((state) => state.films)
    const dispatch = useDispatch()

    useEffect(() => {
        const timeFetch = 500;
        const timeStartFetch = Date.now();

        const fetchData = async () => {
            try {
                dispatch(fetchDataStart());
                // имитация долгой загрузки
                const timer = setTimeout(async () => {
                    const data = filmsData;
                    dispatch(fetchDataSuccess(data));

                    if (Date.now() - timeStartFetch > timeFetch) {
                        clearInterval(timer);
                    }
                }, timeFetch);
            } catch (error) {
                dispatch(fetchDataFailure(error))
            }
        }

        fetchData();
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>error</div>
    }

    return (
        <div>
            MainPage
            {
                films?.map((film) => <div key={film.id}>{film.name}</div>)
            }
        </div>
    );
};

export default MainPage;