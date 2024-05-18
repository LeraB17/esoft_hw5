import { IFilm } from "#interfaces/IFilm";
import { IGenre } from "#interfaces/IGenre";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type SortType = 1 | -1;

interface FetchFilmsArgs {
    sortRating?: SortType;
    type?: string;
}

export const filmsAPI = createApi({
    reducerPath: "filmsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    tagTypes: ["Film", "Genre"],
    endpoints: (build) => ({
        fetchFilms: build.query<IFilm[], FetchFilmsArgs>({
            query: ({ sortRating: sort = -1, type = "" }) => {
                const params: Record<string, any> = {
                    _sort: `${sort > 0 ? "" : "-"}rating`,
                };
                if (type !== "") {
                    params.type = type;
                }
                return {
                    url: "/films",
                    params,
                };
            },
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: "Film" as const, id })), { type: "Film", id: "LIST" }]
                    : [{ type: "Film", id: "LIST" }],
        }),
        fetchGenres: build.query<IGenre[], void>({
            query: () => ({
                url: `/genres`,
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ name }) => ({ type: "Genre" as const, name })), { type: "Genre", id: "LIST" }]
                    : [{ type: "Genre", id: "LIST" }],
        }),
        fetchFilm: build.query<IFilm, number>({
            query: (id: number) => ({
                url: `/films/${id}`,
            }),
            providesTags: (result, error, id) => [{ type: "Film", id }],
        }),
    }),
});
