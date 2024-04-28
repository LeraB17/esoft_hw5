import React from 'react';
import styles from './SideBar.module.css';
import { Stack } from 'react-bootstrap';

const SideBar = () => {
    return (
        <Stack gap={5} className={`border border-secondary border-2 rounded ${styles.SideBar}`}>
            <div>
                Избранное
            </div>
            <div>
                Посмотреть позже
            </div>
        </Stack>
    );
};

export default SideBar;