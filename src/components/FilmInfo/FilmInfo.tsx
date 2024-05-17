import React, { FC } from "react";
import styles from "./FilmInfo.module.css";
import { Card, ListGroup } from "react-bootstrap";
import FavoritesIcon from "#assets/icons/bookmark.svg?react";
import WatchLaterIcon from "#assets/icons/time.svg?react";
import { FILM_PAGE } from "#utils/urls";
import { Link } from "react-router-dom";
import { IFilmInfoProps } from "./IFilmInfoProps";

const FilmInfo: FC<IFilmInfoProps> = ({ film, isFavorite, isWatchLater, onClickAddFavorite, onClickWatchLater }) => {
    return (
        <Card>
            <Card.Header className="d-flex justify-content-between align-items-center fw-bolder fs-4">
                <div>{film?.name}</div>
                <div className="d-flex align-items-center">
                    <FavoritesIcon
                        className={`me-2 ${styles.forAction}`}
                        width={30}
                        height={30}
                        stroke={isFavorite ? "#999999" : "#1e1e1e"}
                        fill={isFavorite ? "#999999" : "none"}
                        onClick={() => onClickAddFavorite(film?.id)}
                    />
                    <WatchLaterIcon
                        className={styles.forAction}
                        width={30}
                        height={30}
                        fill={isWatchLater ? "#999999" : "#1e1e1e"}
                        onClick={() => onClickWatchLater(film?.id)}
                    />
                </div>
            </Card.Header>
            <Card.Body className={styles.Content}>
                <ListGroup className={`list-group-flush border ${styles.Text}`}>
                    <ListGroup.Item className="fw-bolder">Описание:</ListGroup.Item>
                    <ListGroup.Item>{film?.description}</ListGroup.Item>
                </ListGroup>
                <ListGroup className={`list-group-flush border ${styles.Text}`}>
                    <ListGroup.Item>
                        <span>Рейтинг:&nbsp;</span>
                        {film?.rating?.toFixed(1)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span>Тип:&nbsp;</span>
                        {film?.type}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span>Год(ы) выхода:&nbsp;</span>
                        {film?.year}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span>Жанры:&nbsp;</span>
                        {film?.genres?.map((item) => item.name).join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span>В ролях:&nbsp;</span>
                        {film?.actors?.map((item) => item.name).join(", ")}
                        &nbsp;и др.
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup className="list-group-flush border">
                    <ListGroup.Item className="fw-bolder">Похожее по жанрам:</ListGroup.Item>
                    {film?.similar?.map((film) => (
                        <Link
                            key={film.id}
                            to={FILM_PAGE.replace(":id", `${film.id}`)}
                        >
                            <ListGroup.Item>{film.name}</ListGroup.Item>
                        </Link>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default FilmInfo;
