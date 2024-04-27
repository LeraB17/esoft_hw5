import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import Header from '#components/Header/Header';

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className={styles.Content}>
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;