import React, { useEffect } from 'react';
import styles from './FilmsList.module.css';
import Loader from '#components/Loader/Loader';
import FilmCard from '#components/FilmCard/FilmCard';
import { useFetching } from '#hooks/useFetching';
import { useDispatch, useSelector } from 'react-redux';
import { filmsData } from '#store/filmsData';
import { fetchData } from '#store/filmsSlice';
import FilmsSorting from '#components/FilmsSorting/FilmsSorting';
import FilmsFilterType from '#components/FilmsFilterType/FilmsFilterType';
import { filterByDescription, filterByGenres, filterByName, filterByType, sortByRating } from '#utils/dataFilterFunctions';
import { resetFilters, setSort, setType } from '#store/filtersSlice';

const FilmsList = ({ title }) => {
    const { data: films } = useSelector((state) => state.films);
    const { sort, type, searchName, searchDescription, searchGenres } = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    const [fetchFilms, isLoadingFilms, fetchError] = useFetching(async () => {
        let data = filmsData;

        console.log('searchName', searchName)

        if (searchName) {
            data = filterByName(data, searchName);
        }
        if (searchDescription) {
            data = filterByDescription(data, searchDescription);
        }
        if (searchGenres) {
            data = filterByGenres(data, searchGenres);
        }
        data = filterByType(data, type);
        data = sortByRating(data, sort);

        dispatch(fetchData(data));
    });

    useEffect(() => {
        fetchFilms();
    }, [sort, type, searchName, searchDescription, searchGenres])

    useEffect(() => {
        return () => {
            dispatch(resetFilters());
        }
    }, [])

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
                        setSort={(sortValue) => dispatch(setSort(sortValue))}
                    />
                    <FilmsFilterType
                        type={type}
                        setType={(typeValue) => dispatch(setType(typeValue))}
                    />
                </div>
            </div>
            {
                films?.length ?
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
                    : <h6 className='mt-5'>По запросу ничего не найдено :(</h6>
            }
        </>
    );
};

export default FilmsList;