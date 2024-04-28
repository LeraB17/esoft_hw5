import React from 'react';
import styles from './FilmsSorting.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { sortByOptions } from '#utils/filterSortingOptions';
import { Form } from 'react-bootstrap';
import { setSorting } from '#store/filterSortingSlice';

const FilmsSorting = () => {
    const { sortBy } = useSelector((state) => state.filterSorting);
    const dispatch = useDispatch();

    const onChangeSort = (e) => {
        dispatch(setSorting(e.target.value));
    }

    console.log('FilmsSorting')

    return (
        <div className={styles.FilmsSorting}>
            <Form.Select
                value={sortBy}
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