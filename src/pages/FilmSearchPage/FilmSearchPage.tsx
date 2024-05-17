import React, { FC, useState } from "react";
import styles from "./FilmSearchPage.module.css";
import SearchForm from "#components/SearchForm/SearchForm";
import FilmsList from "#components/FilmsList/FilmsList";
import { useSearchParams } from "react-router-dom";

const FilmSearchPage: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [startSearch, setStartSearch] = useState<boolean>(searchParams.size > 0);

    return (
        <div>
            <SearchForm
                startSearch={startSearch}
                setStartSearch={setStartSearch}
            />
            {startSearch && <FilmsList title={"Результаты поиска"} />}
        </div>
    );
};

export default FilmSearchPage;
