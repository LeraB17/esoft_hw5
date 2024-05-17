import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { ICommentCardProps } from "./ICommentCardProps";

const CommentCard: FC<ICommentCardProps> = ({ comment }) => {
    return (
        <Card>
            <Card.Body className="text-start">
                <Card.Title className="d-flex justify-content-between">
                    <div>{comment?.user ? comment?.user?.name : "Анонимный пользователь"}</div>
                    <div className="fs-6">{comment?.date}</div>
                </Card.Title>
                <Card.Text>{comment?.text}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CommentCard;
