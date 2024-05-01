import React, { useEffect, useState } from 'react';
import styles from './CommentForm.module.css';
import { Button, Form } from 'react-bootstrap';
import TextArea from '#components/UI/TextArea/TextArea';
import { useLocation } from 'react-router-dom';

const CommentForm = ({ onClickSubmit }) => {
    const [comment, setComment] = useState('');
    const location = useLocation();

    useEffect(() => {
        return () => setComment('');
    }, [location]);

    const handlerSubmit = () => {
        onClickSubmit(comment);
        setComment('');
    }

    return (
        <div className={styles.CommentForm}>
            <h5 className='fw-bolder'>Оставьте отзыв</h5>
            <Form className={styles.Form}>
                <TextArea
                    className="mb-3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button
                    className='w-25'
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