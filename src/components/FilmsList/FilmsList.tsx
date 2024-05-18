import React, { FC, useEffect } from "react";
import styles from "./FilmsList.module.css";
import Loader from "#components/UI/Loader/Loader";
import FilmCard from "#components/FilmCard/FilmCard";
import FilmsSorting from "#components/FilmsSorting/FilmsSorting";
import FilmsFilterType from "#components/FilmsFilterType/FilmsFilterType";
import {
    filterByDescription,
    filterByGenres,
    filterByName,
    getPageItems,
    getSearchString,
} from "#utils/dataFilterFunctions";
import { resetFilters, setPage, setSort, setType } from "#store/filtersSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { FILM_SEARCH_PAGE, MAIN_PAGE } from "#utils/urls";
import { IFilmsListProps } from "./IFilmsListProps";
import { IFilm } from "#interfaces/IFilm";
import { filmsAPI } from "#services/FilmsService";
import { sortByOptions, typesOptions } from "#utils/filterSortingOptions";
import { useAppDispatch, useAppSelector } from "#hooks/redux";
import { userAPI } from "#services/UserService";
import PaginationBlock from "#components/PaginationBlock/PaginationBlock";

const FilmsList: FC<IFilmsListProps> = ({ title }) => {
    const { sort, type, searchName, searchDescription, searchGenres, page, limit } = useAppSelector(
        (state) => state.filters
    );
    const dispatch = useAppDispatch();

    const { data: favoriteFilms, error: errorF, isLoading: isLoadingF } = userAPI.useFetchFavoritesFilmsQuery();
    const { data: watchLaterFilms, error: errorW, isLoading: isLoadingW } = userAPI.useFetchWatchLaterFilmsQuery();
    const [createFavoriteFilm, {}] = userAPI.useCreateFavoriteFilmMutation();
    const [createWatchLaterFilm, {}] = userAPI.useCreateWatchLaterFilmMutation();
    const [deleteFavoriteFilm, {}] = userAPI.useDeleteFavoriteFilmMutation();
    const [deleteWatchLaterFilm, {}] = userAPI.useDeleteWatchLaterFilmMutation();

    const {
        data: films,
        error: fetchError,
        isLoading: isLoadingFilms,
        refetch,
    } = filmsAPI.useFetchFilmsQuery({
        sortRating: sort === sortByOptions.RATING_DOWN ? -1 : 1,
        type: type === typesOptions.ALL ? "" : type.toLowerCase(),
    });

    const navigate = useNavigate();
    const location = useLocation();

    // фильтрация по названию, описанию и жанрам (потому что json-server не умеет такое)
    const filterFilms = () => {
        let data = films;

        if (data) {
            // типа самые популярные (по рейтингу)
            if (location.pathname === MAIN_PAGE) {
                return data.slice(0, 6);
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
        }
        return data;
    };

    const filteredFilms = filterFilms();
    const pageItems = getPageItems(filteredFilms, limit);

    useEffect(() => {
        refetch();
    }, [sort, type, refetch, page]);

    useEffect(() => {
        return () => {
            dispatch(resetFilters());
        };
    }, []);

    useEffect(() => {
        dispatch(setPage(0));
    }, [sort, type, searchName, searchDescription, searchGenres]);

    const handlerClickGenre = (genre: string) => {
        navigate(
            `${FILM_SEARCH_PAGE}${getSearchString({
                genres: genre,
            })}`
        );
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

    if (isLoadingFilms || isLoadingF || isLoadingW) {
        return <Loader />;
    }

    if (fetchError || errorF || errorW) {
        return <div>Не удалось загрузить фильмы :(</div>;
    }

    return (
        <>
            <div className={`mb-2 ${styles.FilmsListTop}`}>
                <div className="d-flex align-items-center">
                    <h3>{title}:&nbsp;</h3>
                    <h4>найдено&nbsp;{filteredFilms?.length}</h4>
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
            {filteredFilms?.length ? (
                <div className={styles.FilmsList}>
                    {filteredFilms?.slice(page * limit, (page + 1) * limit).map((film: IFilm) => (
                        <FilmCard
                            key={film.id}
                            film={film}
                            isFavorite={checkIsFavorite(film?.id)}
                            isWatchLater={checkIsWatchLater(film?.id)}
                            onClickAddFavorites={(filmId) => handlerAddFavorite(filmId)}
                            onClickAddWatchLater={(filmId) => handlerWatchLater(filmId)}
                            onClickGenge={(genre) => handlerClickGenre(genre)}
                        />
                    ))}
                </div>
            ) : (
                <h6 className="mt-5">По запросу ничего не найдено :(</h6>
            )}
            {filteredFilms?.length && filteredFilms?.length > limit ? (
                <PaginationBlock
                    className="mt-3"
                    items={pageItems}
                    active={page}
                    setActive={(pg) => dispatch(setPage(pg))}
                />
            ) : null}
        </>
    );
};

export default FilmsList;
