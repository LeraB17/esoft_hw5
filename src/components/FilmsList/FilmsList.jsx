import React, { useEffect } from 'react';
import styles from './FilmsList.module.css';
import Loader from '#components/UI/Loader/Loader';
import FilmCard from '#components/FilmCard/FilmCard';
import { useFetching } from '#hooks/useFetching';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '#store/filmsSlice';
import FilmsSorting from '#components/FilmsSorting/FilmsSorting';
import FilmsFilterType from '#components/FilmsFilterType/FilmsFilterType';
import { filterByDescription, filterByGenres, filterByName, filterByType, getSearchString, sortByRating } from '#utils/dataFilterFunctions';
import { resetFilters, setSort, setType } from '#store/filtersSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { FILM_SEARCH_PAGE, MAIN_PAGE } from '#utils/urls';
import { addFavoriteFilm, addWatchLaterFilm, removeFavoriteFilm, removeWatchLaterFilm } from '#store/userSlice';

const FilmsList = ({ title }) => {
    const { data: films } = useSelector((state) => state.films);
    const { sort, type, searchName, searchDescription, searchGenres } = useSelector((state) => state.filters);
    const { favoriteFilms, watchLaterFilms } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [fetchFilms, isLoadingFilms, fetchError] = useFetching(async () => {
        const responce = await fetch('https://raw.githubusercontent.com/LeraB17/esoft_hw5/data-branch/films.json');
        let data = await responce.json();

        // первые 6 типа самые популярные
        if (location.pathname === MAIN_PAGE) {
            data = data.slice(0, 6);
        }

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

    const handlerClickGenre = (genre) => {
        navigate(`${FILM_SEARCH_PAGE}${getSearchString({
            genres: genre,
        })}`);
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

    if (isLoadingFilms) {
        return <Loader />
    }

    if (fetchError) {
        return <div>Не удалось загрузить фильмы :(  {fetchError}</div>
    }

    return (
        <>
            <div className={`mb-2 ${styles.FilmsListTop}`}>
                <div className='d-flex align-items-center'>
                    <h3>{title}:&nbsp;</h3>
                    <h4>найдено&nbsp;{films?.length}</h4>
                </div>

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
                                isFavorite={checkIsFavorite(film?.id)}
                                isWatchLater={checkIsWatchLater(film?.id)}
                                onClickAddFavorites={(filmId) => handlerAddFavorite(filmId)}
                                onClickAddWatchLater={(filmId) => handlerWatchLater(filmId)}
                                onClickGenge={(genre) => handlerClickGenre(genre)}
                            />)
                        }
                    </div>
                    : <h6 className='mt-5'>По запросу ничего не найдено :(</h6>
            }
        </>
    );
};

export default FilmsList;