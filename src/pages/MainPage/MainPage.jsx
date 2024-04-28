import React, { useEffect } from 'react';
import styles from './MainPage.module.css';
import FilmsList from '#components/FilmsList/FilmsList';
import FilmsSorting from '#components/FilmsSorting/FilmsSorting';
import FilmsFilterType from '#components/FilmsFilterType/FilmsFilterType';
import { useFetching } from '#hooks/useFetching';
import { useDispatch, useSelector } from 'react-redux';
import { filmsData } from '#store/filmsData';
import { fetchData, fetchSortedData } from '#store/filmsSlice';

const MainPage = () => {
    const { data: films } = useSelector((state) => state.films)
    const { sortBy } = useSelector((state) => state.filterSorting)
    const dispatch = useDispatch()

    const [fetchFilms, isLoadingFilms, fetchError] = useFetching(async () => {
        const data = filmsData;
        dispatch(fetchData(data));
    });

    const [fetchSortedFilms, isLoadingSortedFilms, fetchSortedError] = useFetching(async () => {
        dispatch(fetchSortedData(sortBy));
    });

    useEffect(() => {
        fetchFilms();
    }, [])

    useEffect(() => {
        fetchSortedFilms();
    }, [sortBy])

    console.log('MainPage')

    return (
        <>
            <div className={`mb-2 ${styles.MainTop}`}>
                <h3>Популярно сейчас</h3>
                <div className={styles.SortFilter}>
                    <FilmsSorting />
                    <FilmsFilterType />
                </div>
            </div>
            <FilmsList
                films={films}
                isLoading={isLoadingFilms || isLoadingSortedFilms}
                error={fetchError || fetchSortedError}
            />
        </>
    );
};

export default MainPage;