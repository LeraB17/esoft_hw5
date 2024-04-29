import React, { useState } from 'react';
import styles from './FilmSearchPage.module.css';
import SearchForm from '#components/SearchForm/SearchForm';
import FilmsList from '#components/FilmsList/FilmsList';

const FilmSearchPage = () => {
    const [startSearch, setStartSearch] = useState(false);

    return (
        <div>
            <SearchForm
                startSearch={startSearch}
                setStartSearch={setStartSearch}
            />
            {
                startSearch && <FilmsList
                    title={"Результаты поиска"}
                />
            }
        </div>
    );
};

export default FilmSearchPage;