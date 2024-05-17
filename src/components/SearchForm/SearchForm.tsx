import React, { FC, useEffect, useMemo, useState } from "react";
import styles from "./SearchForm.module.css";
import { Badge, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import MultiSelect from "#components/UI/MultiSelect/MultiSelect";
import { genresData } from "#store/genresData";
import { setSearchDescription, setSearchGenres, setSearchName } from "#store/filtersSlice";
import Input from "#components/UI/Input/Input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSearchString } from "#utils/dataFilterFunctions";
import { ISearchFormProps } from "./ISearchFormProps";
import { SelectedOption } from "#components/UI/MultiSelect/IMultiSelectProps";

const SearchForm: FC<ISearchFormProps> = ({ startSearch, setStartSearch }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchByName, setSearchByName] = useState<string>(searchParams.get("name") || "");
    const [searchByDescription, setSearchByDescription] = useState<string>(searchParams.get("description") || "");
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const genresOptions = useMemo(() => {
        const genreNames = genresData?.map((genre) => genre.name);
        return genreNames.sort((a, b) => {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
    }, [genresData]);

    useEffect(() => {
        const nameParam = searchParams.get("name") || "";
        const descriptionParam = searchParams.get("description") || "";
        const genresParam = searchParams.get("genres") ? searchParams.get("genres")!.split(",") : [];

        const validGenres = genresParam.filter((genre) => genresOptions.includes(genre));

        if (validGenres.length !== genresParam.length) {
            navigate(
                getSearchString({
                    name: nameParam,
                    description: descriptionParam,
                    genres: validGenres,
                }),
                { replace: true }
            );
        }

        setSearchByName(nameParam);
        setSearchByDescription(descriptionParam);
        setSelectedGenres(validGenres);

        dispatch(setSearchName(nameParam));
        dispatch(setSearchDescription(descriptionParam));
        dispatch(setSearchGenres(validGenres));
    }, [searchParams]);

    const onSubmitClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!startSearch) {
            setStartSearch(true);
        }

        navigate(
            getSearchString({
                name: searchByName,
                description: searchByDescription,
                genres: selectedGenres,
            })
        );
    };

    const unSelectGenre = (genre: SelectedOption) => {
        setSelectedGenres((prev) => prev.filter((item) => item !== genre));
    };

    return (
        <Form className={`border border-secondary rounded p-2 mb-3 ${styles.Form}`}>
            <Input
                label={"Название"}
                value={searchByName}
                onChange={(event) => setSearchByName((event.target as HTMLInputElement).value)}
                type="text"
                placeholder="Введите название..."
            />
            <Input
                label={"Текст описания"}
                value={searchByDescription}
                onChange={(event) => setSearchByDescription((event.target as HTMLInputElement).value)}
                type="text"
                placeholder="Введите слова из описания..."
            />

            <MultiSelect
                title={"Выберите жанры"}
                options={genresOptions.map((genre) => ({ value: genre, label: genre }))}
                selectedValues={selectedGenres}
                setSelectedValues={setSelectedGenres}
            />

            <div>
                {selectedGenres?.map((genre) => (
                    <Badge
                        key={genre}
                        className={`me-2 ${styles.Genre}`}
                        bg="secondary"
                        onClick={() => unSelectGenre(genre)}
                    >
                        {genre}
                    </Badge>
                ))}
            </div>

            <div></div>

            <Button
                className="mt-2"
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
