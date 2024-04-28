import React, { useEffect, useState } from 'react';
import styles from './FilmsList.module.css';
import Loader from '#components/Loader/Loader';
import FilmCard from '#components/FilmCard/FilmCard';
import { useFetching } from '#hooks/useFetching';
import { useDispatch, useSelector } from 'react-redux';
import { filmsData } from '#store/filmsData';
import { fetchData } from '#store/filmsSlice';
import FilmsSorting from '#components/FilmsSorting/FilmsSorting';
import FilmsFilterType from '#components/FilmsFilterType/FilmsFilterType';
import { typesOptions, sortByOptions } from '#utils/filterSortingOptions';

const FilmsList = ({ title }) => {
    const [sort, setSort] = useState(sortByOptions.RATING_DOWN);
    const [type, setType] = useState(typesOptions.ALL);

    const { data: films } = useSelector((state) => state.films);
    const dispatch = useDispatch();

    const [fetchFilms, isLoadingFilms, fetchError] = useFetching(async () => {
        let data = [...filmsData];

        switch (type) {
            case typesOptions.CARTOONS:
            case typesOptions.MOVIE:
            case typesOptions.SERIES:
                data = data.filter((f) => f.type === type.toLowerCase());
                break;
            default:
                break;
        }

        switch (sort) {
            case sortByOptions.RATING_UP:
                data.sort((a, b) => a.rating - b.rating);
                break;
            case sortByOptions.RATING_DOWN:
                data.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        dispatch(fetchData(data));
    });

    useEffect(() => {
        fetchFilms();
    }, [sort, type])

    console.log('FilmsList')

    if (isLoadingFilms) {
        return <Loader />
    }

    if (fetchError) {
        return <div>Не удалось загрузить фильмы :(  {fetchError}</div>
    }

    return (
        <>
            <div className={`mb-2 ${styles.FilmsListTop}`}>
                <h3>{title}</h3>
                <div className={styles.SortFilter}>
                    <FilmsSorting
                        sort={sort}
                        setSort={setSort}
                    />
                    <FilmsFilterType
                        type={type}
                        setType={setType}
                    />
                </div>
            </div>
            <div className={styles.FilmsList}>
                {
                    films?.map((film) => <FilmCard
                        key={film.id}
                        film={film}
                        onClickAddFavorites={() => { }}
                        onClickAddWatchLater={() => { }}
                        onClickGenge={() => { }}
                    />)
                }
            </div>
        </>
    );
};

export default FilmsList;