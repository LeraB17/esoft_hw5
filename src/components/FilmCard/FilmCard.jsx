import React from 'react';
import styles from './FilmCard.module.css';
import { Badge, Card, ListGroup } from 'react-bootstrap';
import FavoritesIcon from '#assets/icons/bookmark.svg?react';
import WatchLaterIcon from '#assets/icons/time.svg?react';

const FilmCard = ({
    name,
    year,
    description,
    actors,
    type,
    rating,
    genres,
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
                    <div>{name}</div>
                    <div className="border border-dark p-1 rounded">
                        {rating.toFixed(1)}
                    </div>
                </Card.Title>
                <Card.Text className={styles.Description}>
                    {description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{type} ({year})</ListGroup.Item>
                <ListGroup.Item className={styles.Actors}>
                    В ролях:&nbsp;
                    {
                        actors?.map((actor) => actor.name).join(', ')
                    }
                </ListGroup.Item>
                <ListGroup.Item className={styles.Genres}>
                    {
                        genres?.map((genre, i) => <Badge
                            key={i}
                            className={`me-2 ${styles.forAction}`}
                            bg="secondary"
                            onClick={onClickGenge}
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