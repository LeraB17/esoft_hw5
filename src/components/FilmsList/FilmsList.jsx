import React from 'react';
import styles from './FilmsList.module.css';
import Loader from '#components/Loader/Loader';
import FilmCard from '#components/FilmCard/FilmCard';

const FilmsList = ({ films, isLoading, error }) => {
    
    console.log('FilmsList')

    return (
        <>
            {
                isLoading && <Loader />
            }
            {
                error && <div>Не удалось загрузить фильмы :(</div>
            }
            <div className={styles.FilmsList}>
                {
                    films?.map((film) => <FilmCard
                        key={film.id}
                        name={film.name}
                        year={film.year}
                        description={film.description}
                        actors={film.actors}
                        type={film.type}
                        rating={film.rating}
                        genres={film.genres}
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