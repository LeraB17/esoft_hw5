import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import Header from '#components/Header/Header';
import SideBar from '#components/SideBar/SideBar';
import ScrollToTop from '#components/ScrollToTop/ScrollToTop';

const MainLayout = () => {
    return (
        <>
            <Header />
            <ScrollToTop />
            <div className={styles.Content}>
                <div className={styles.Outlet}>
                    <Outlet />
                </div>
                <div>
                    <SideBar />
                </div>
            </div>
        </>
    );
};

export default MainLayout;