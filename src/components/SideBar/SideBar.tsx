import React, { FC } from "react";
import styles from "./SideBar.module.css";
import { ListGroup, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FILM_PAGE } from "#utils/urls";
import { userAPI } from "#services/UserService";

const SideBar: FC = () => {
    const { data: favoriteFilms } = userAPI.useFetchFavoritesFilmsQuery();
    const { data: watchLaterFilms } = userAPI.useFetchWatchLaterFilmsQuery();

    return (
        <Stack
            gap={3}
            className={`border rounded ${styles.SideBar}`}
        >
            <ListGroup className="list-group-flush rounded">
                <ListGroup.Item className="fw-bolder">Избранное</ListGroup.Item>
                {favoriteFilms?.map((film) => (
                    <ListGroup.Item
                        key={film?.id}
                        className="fs-6"
                    >
                        <Link
                            to={FILM_PAGE.replace(":id", `${film?.id}`)}
                            className="text-dark"
                        >
                            {film?.name}
                        </Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <ListGroup className="list-group-flush rounded">
                <ListGroup.Item className="fw-bolder">Посмотреть позже</ListGroup.Item>
                {watchLaterFilms?.map((film) => (
                    <ListGroup.Item
                        key={film?.id}
                        className="fs-6"
                    >
                        <Link
                            to={FILM_PAGE.replace(":id", `${film?.id}`)}
                            className="text-dark"
                        >
                            {film?.name}
                        </Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Stack>
    );
};

export default SideBar;
