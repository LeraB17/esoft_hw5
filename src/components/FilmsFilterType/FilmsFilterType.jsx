import React from 'react';
import styles from './FilmsFilterType.module.css';
import { Badge, Stack } from 'react-bootstrap';
import { typesOptions } from '#utils/filterSortingOptions';

const FilmsFilterType = ({ type, setType }) => {
    return (
        <Stack direction='horizontal' gap={2}>
            {
                Object.entries(typesOptions).map(([key, label]) => (
                    <Badge
                        key={key}
                        className={styles.Type}
                        bg={label === type ? 'dark' : 'secondary'}
                        onClick={() => setType(label)}
                    >
                        {label}
                    </Badge>
                ))
            }
        </Stack>
    );
};

export default FilmsFilterType;