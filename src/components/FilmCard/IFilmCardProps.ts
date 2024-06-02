import { IFilm } from "#interfaces/IFilm";

export interface IFilmCardProps {
    film: IFilm;
    isFavorite: boolean;
    isWatchLater: boolean;
    onClickAddFavorites: (filmId: number) => void;
    onClickAddWatchLater: (filmId: number) => void;
    onClickGenge: (genre: string) => void;
}
