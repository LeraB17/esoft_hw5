import { IFilmPage } from "#interfaces/IFilm";

export interface IFilmInfoProps {
    film: IFilmPage;
    isFavorite: boolean;
    isWatchLater: boolean;
    onClickAddFavorite: (filmId: number) => void;
    onClickWatchLater: (filmId: number) => void;
}
