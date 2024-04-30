import React, { useMemo, useState } from 'react';
import styles from './SearchForm.module.css';
import { Badge, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import MultiSelect from '#components/UI/MultiSelect/MultiSelect';
import { genresData } from '#store/genresData';
import { setSearchDescription, setSearchGenres, setSearchName } from '#store/filtersSlice';
import { sortByName } from '#utils/dataFilterFunctions';
import Input from '#components/UI/Input/Input';

const SearchForm = ({ startSearch, setStartSearch }) => {
    const [searchByName, setSearchByName] = useState('');
    const [searchByDescription, setSearchByDescription] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);

    const genresOptions = useMemo(() => sortByName(genresData), [genresData]);

    const dispatch = useDispatch();

    const onSubmitClickHandler = (event) => {
        event.preventDefault();

        dispatch(setSearchName(searchByName));
        dispatch(setSearchDescription(searchByDescription));
        dispatch(setSearchGenres(selectedGenres));

        if (!startSearch) {
            setStartSearch(true);
        }
    }

    const unSelectGenre = (genre) => {
        setSelectedGenres(prev => prev.filter((item) => item !== genre))
    }

    return (
        <Form className={`border border-secondary rounded p-2 mb-3 ${styles.Form}`}>
            <Input
                className={"me-2"}
                label={"Название"}
                value={searchByName}
                onChange={(e) => setSearchByName(e.target.value)}
                type="text"
                placeholder="Введите название..."
            />
            <Input
                className={"ms-2"}
                label={"Текст описания"}
                value={searchByDescription}
                onChange={(e) => setSearchByDescription(e.target.value)}
                type="text"
                placeholder="Введите слова из описания..."
            />

            <MultiSelect
                title={"Выберите жанры"}
                options={genresOptions.map((genre) => ({ value: genre.name, label: genre.name }))}
                selectedValues={selectedGenres}
                setSelectedValues={setSelectedGenres}
            />

            <div>
                {
                    selectedGenres?.map((genre) =>
                        <Badge
                            key={genre}
                            className={`me-2 ${styles.Genre}`}
                            bg='secondary'
                            onClick={() => unSelectGenre(genre)}
                        >
                            {genre}
                        </Badge>)
                }
            </div>

            <div></div>

            <Button
                className='mt-2'
                variant="dark"
                type="submit"
                onClick={onSubmitClickHandler}
            >
                Поиск
            </Button>
        </Form>
    );
};

export default SearchForm;