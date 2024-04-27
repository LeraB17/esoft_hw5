import React from 'react';
import styles from './Header.module.css';
import { Container, Form, InputGroup, Navbar, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FILM_SEARCH_PAGE, MAIN_PAGE } from '#utils/urls';
import FilmIcon from '#assets/icons/movie.svg?react';
import SettingsIcon from '#assets/icons/settings.svg?react';
import SearchIcon from '#assets/icons/search.svg?react';
import UserIcon from '#assets/icons/user.svg?react';

const Header = () => {
    return (
        <Navbar fixed='top' bg="dark" data-bs-theme="dark" className="bg-body-tertiary justify-content-between">
            <Container>
                <Navbar.Brand>
                    <Link to={MAIN_PAGE} className={styles.HeaderLink}>
                        <FilmIcon width={50} height={50} fill={"#aeaeae"} />
                        <div>Films Searcher</div>
                    </Link>
                </Navbar.Brand>

                <Stack direction="horizontal" gap={5}>
                    <Form>
                        <InputGroup className="">
                            <Form.Control
                                placeholder="поиск..."
                            />
                            <InputGroup.Text>
                                <Link to={FILM_SEARCH_PAGE}>
                                    <SettingsIcon width={30} height={30} fill={"#aeaeae"} />
                                </Link>
                            </InputGroup.Text>
                            <InputGroup.Text>
                                <SearchIcon width={30} height={30} stroke={"#aeaeae"} />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form>

                    <div>
                        <UserIcon width={40} height={40} stroke={"#aeaeae"} />
                    </div>
                </Stack>
            </Container>
        </Navbar>
    );
};

export default Header;