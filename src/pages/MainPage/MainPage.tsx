import React, { FC } from "react";
import styles from "./MainPage.module.css";
import FilmsList from "#components/FilmsList/FilmsList";

const MainPage: FC = () => {
    return (
        <>
            <FilmsList title={"Популярно сейчас"} />
        </>
    );
};

export default MainPage;
