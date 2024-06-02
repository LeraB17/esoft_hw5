import { IComment } from "#interfaces/IComment";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface FetchFilmCommentsArgs {
    filmId: number;
}

export const commentsAPI = createApi({
    reducerPath: "commentsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    tagTypes: ["Comment"],
    endpoints: (build) => ({
        fetchFilmComments: build.query<IComment[], FetchFilmCommentsArgs>({
            query: ({ filmId }) => {
                const params: Record<string, any> = {};
                params["filmId"] = filmId;
                return {
                    url: "/comments",
                    params,
                };
            },
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: "Comment" as const, id })), { type: "Comment", id: "LIST" }]
                    : [{ type: "Comment", id: "LIST" }],
        }),
        createComment: build.mutation<IComment, IComment>({
            query: (comment) => ({
                url: `/comments`,
                method: "POST",
                body: comment,
            }),
            invalidatesTags: [{ type: "Comment", id: "LIST" }],
        }),
    }),
});
