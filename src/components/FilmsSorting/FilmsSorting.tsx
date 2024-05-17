import React, { FC } from "react";
import styles from "./FilmsSorting.module.css";
import { sortByOptions } from "#utils/filterSortingOptions";
import { Form } from "react-bootstrap";
import { IFilmsSortingProps } from "./IFilmsSortingProps";

const FilmsSorting: FC<IFilmsSortingProps> = ({ sort, setSort }) => {
    const onChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value);
    };

    return (
        <div className={styles.FilmsSorting}>
            <Form.Select
                value={sort}
                onChange={onChangeSort}
            >
                {Object.entries(sortByOptions).map(([key, label]) => (
                    <option
                        key={key}
                        value={label}
                    >
                        {label}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};

export default FilmsSorting;
