import React, { FC, useEffect, useState } from "react";
import styles from "./CommentForm.module.css";
import { Button, Form } from "react-bootstrap";
import TextArea from "#components/UI/TextArea/TextArea";
import { useLocation } from "react-router-dom";
import { ICommentFormProps } from "./ICommentFormProps";

const CommentForm: FC<ICommentFormProps> = ({ onClickSubmit }) => {
    const [comment, setComment] = useState<string>("");
    const location = useLocation();

    useEffect(() => {
        return () => setComment("");
    }, [location]);

    const handlerSubmit = () => {
        onClickSubmit(comment);
        setComment("");
    };

    return (
        <div className={styles.CommentForm}>
            <h5 className="fw-bolder">Оставьте отзыв</h5>
            <Form className={styles.Form}>
                <TextArea
                    className="mb-3"
                    value={comment}
                    onChange={(e) => setComment((e.target as HTMLTextAreaElement).value)}
                />
                <Button
                    className="w-25"
                    variant="secondary"
                    onClick={handlerSubmit}
                >
                    Отправить
                </Button>
            </Form>
        </div>
    );
};

export default CommentForm;
