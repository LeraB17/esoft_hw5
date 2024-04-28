import React from 'react';
import styles from './FilmsSorting.module.css';
import { sortByOptions } from '#utils/filterSortingOptions';
import { Form } from 'react-bootstrap';

const FilmsSorting = ({ sort, setSort }) => {
    const onChangeSort = (e) => {
        setSort(e.target.value);
    }

    console.log('FilmsSorting')

    return (
        <div className={styles.FilmsSorting}>
            <Form.Select
                value={sort}
                onChange={onChangeSort}
            >
                {
                    Object.entries(sortByOptions).map(([key, label]) => (
                        <option key={key} value={label}>
                            {label}
                        </option>
                    ))
                }
            </Form.Select>
        </div>

    );
};

export default FilmsSorting;