import { IFilm } from "#interfaces/IFilm";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    tagTypes: ["Favorites", "WatchLater"],
    endpoints: (build) => ({
        fetchFavoritesFilms: build.query<IFilm[], void>({
            query: () => ({
                url: `/favorites`,
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Favorites" as const, id })),
                          { type: "Favorites", id: "LIST" },
                      ]
                    : [{ type: "Favorites", id: "LIST" }],
        }),
        createFavoriteFilm: build.mutation<IFilm, IFilm>({
            query: (film) => ({
                url: `/favorites`,
                method: "POST",
                body: film,
            }),
            invalidatesTags: [{ type: "Favorites", id: "LIST" }],
        }),
        deleteFavoriteFilm: build.mutation<IFilm, IFilm>({
            query: (film) => ({
                url: `/favorites/${film.id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Favorites", id: "LIST" }],
        }),
        fetchWatchLaterFilms: build.query<IFilm[], void>({
            query: () => ({
                url: `/watchLater`,
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "WatchLater" as const, id })),
                          { type: "WatchLater", id: "LIST" },
                      ]
                    : [{ type: "WatchLater", id: "LIST" }],
        }),
        createWatchLaterFilm: build.mutation<IFilm, IFilm>({
            query: (film) => ({
                url: `/watchLater`,
                method: "POST",
                body: film,
            }),
            invalidatesTags: [{ type: "WatchLater", id: "LIST" }],
        }),
        deleteWatchLaterFilm: build.mutation<IFilm, IFilm>({
            query: (film) => ({
                url: `/watchLater/${film.id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "WatchLater", id: "LIST" }],
        }),
    }),
});
