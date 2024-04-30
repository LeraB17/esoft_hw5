import React from 'react';
import styles from './FilmCard.module.css';
import { Badge, Card, ListGroup } from 'react-bootstrap';
import FavoritesIcon from '#assets/icons/bookmark.svg?react';
import WatchLaterIcon from '#assets/icons/time.svg?react';
import { Link } from 'react-router-dom';
import { FILM_PAGE } from '#utils/urls';

const FilmCard = ({
    film,
    onClickAddFavorites,
    onClickAddWatchLater,
    onClickGenge,
}) => {
    return (
        <Card>
            <Card.Header className={styles.Header}>
                <FavoritesIcon
                    className={styles.forAction}
                    width={30}
                    height={30}
                    stroke={"#1e1e1e"}
                    fill={"none"}
                    onClick={onClickAddFavorites}
                />
                <WatchLaterIcon
                    className={styles.forAction}
                    width={30}
                    height={30}
                    fill={"#1e1e1e"}
                    onClick={onClickAddWatchLater}
                />
            </Card.Header>
            <Card.Body>
                <Card.Title className={styles.Title}>
                    <Link to={FILM_PAGE.replace(':id', film?.id)} className='text-dark text-start'>{film?.name}</Link>
                    <div className="border border-dark p-1 rounded">
                        {film?.rating.toFixed(1)}
                    </div>
                </Card.Title>
                <Card.Text className={styles.Description}>
                    {film?.description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{film?.type} ({film?.year})</ListGroup.Item>
                <ListGroup.Item className={styles.Actors}>
                    В ролях:&nbsp;
                    {
                        film?.actors?.map((actor) => actor.name).join(', ')
                    }
                </ListGroup.Item>
                <ListGroup.Item className={styles.Genres}>
                    {
                        film?.genres?.map((genre, i) => <Badge
                            key={i}
                            className={`me-2 ${styles.forAction}`}
                            bg="secondary"
                            onClick={() => onClickGenge(genre.name)}
                        >
                            {genre.name}
                        </Badge>)
                    }
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default FilmCard;