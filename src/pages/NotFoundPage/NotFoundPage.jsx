import React from 'react';
import styles from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';
import { MAIN_PAGE } from '#utils/urls';

const NotFoundPage = () => {
    return (
        <div>
            <div>Страница не найдена</div>
            <Link to={MAIN_PAGE}>На главную</Link>
        </div>
    );
};

export default NotFoundPage;