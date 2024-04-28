import React from 'react';
import styles from './MainPage.module.css';
import FilmsList from '#components/FilmsList/FilmsList';

const MainPage = () => {
    console.log('MainPage')

    return (
        <>
            <FilmsList
                title={"Популярно сейчас"}
            />
        </>
    );
};

export default MainPage;