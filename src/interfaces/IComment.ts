export type DateElement = `0${number}` | number;
export type CommentDate = `${DateElement}-${DateElement}-${DateElement} ${DateElement}:${DateElement}:${DateElement}`;

export type User = { name: string } | null;

export interface IComment {
    id: number;
    filmId: number;
    user: User;
    text: string;
    date: CommentDate;
}
