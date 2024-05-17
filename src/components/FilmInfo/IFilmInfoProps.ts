import { IFilm } from "#interfaces/IFilm";

export interface IFilmInfoProps {
    film: IFilm;
    isFavorite: boolean;
    isWatchLater: boolean;
    onClickAddFavorite: (filmId: number) => void;
    onClickWatchLater: (filmId: number) => void;
}
