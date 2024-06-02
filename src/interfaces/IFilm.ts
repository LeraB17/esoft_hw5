import { IActor } from "./IActor";
import { IComment } from "./IComment";
import { IGenre } from "./IGenre";

export type FilmType = "сериал" | "фильм" | "мультфильм";

export interface IFilm {
    id: number;
    name: string;
    year: string;
    description: string;
    actors: IActor[];
    type: FilmType;
    rating: number;
    genres: IGenre[];
}

export interface IFilmPage extends IFilm {
    similar: IFilm[];
    comments: IComment[];
}
