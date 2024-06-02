import React, { FC } from "react";
import { Stack } from "react-bootstrap";
import CommentCard from "#components/CommentCard/CommentCard";
import { sortByDate } from "#utils/dataFilterFunctions";
import { ICommentsListProps } from "./ICommentsListProps";

const CommentsList: FC<ICommentsListProps> = ({ comments }) => {
    return (
        <Stack gap={3}>
            {sortByDate(comments)?.map((comment) => (
                <CommentCard
                    key={comment?.id}
                    comment={comment}
                />
            ))}
        </Stack>
    );
};

export default CommentsList;
