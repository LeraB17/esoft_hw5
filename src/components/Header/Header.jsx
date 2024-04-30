import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Container, Form, InputGroup, Navbar, Stack } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FILM_SEARCH_PAGE, MAIN_PAGE } from '#utils/urls';
import FilmIcon from '#assets/icons/movie.svg?react';
import SettingsIcon from '#assets/icons/settings.svg?react';
import SearchIcon from '#assets/icons/search.svg?react';
import UserIcon from '#assets/icons/user.svg?react';
import { useDispatch } from 'react-redux';
import { useDebounce } from '#hooks/useDebounce';
import { setSearchName } from '#store/filtersSlice';

const Header = () => {
    const [search, setSearch] = useState('');
    const debouncedValue = useDebounce(search, 1000);
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(setSearchName(debouncedValue))
    }, [debouncedValue]);

    useEffect(() => {
        setSearch('');
    }, [location.pathname])

    const handleAction = (event) => {
        if (event.type === 'keydown' && event.key !== 'Enter') {
            return;
        }
        event.preventDefault();
    };

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
                        <InputGroup>
                            <Form.Control
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleAction}
                                placeholder="Поиск..."
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