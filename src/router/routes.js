import FilmPage from "#pages/FilmPage/FilmPage";
import FilmSearchPage from "#pages/FilmSearchPage/FilmSearchPage";
import MainPage from "#pages/MainPage/MainPage";
import { FILM_PAGE, FILM_SEARCH_PAGE, MAIN_PAGE } from "#utils/urls";

export const routes = [
  {
    path: MAIN_PAGE,
    Component: MainPage,
  },
  {
    path: FILM_SEARCH_PAGE,
    Component: FilmSearchPage,
  },
  {
    path: FILM_PAGE,
    Component: FilmPage,
  },
];
