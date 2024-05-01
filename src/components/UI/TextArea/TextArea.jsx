import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';

const TextArea = ({ className, label, value, onChange, rows = 3, ...props }) => {
    return (
        <FormGroup className={`w-100 ${className}`}>
            {
                label && <Form.Label className='text'>
                    {label}
                </Form.Label>
            }
            <Form.Control
                as="textarea"
                rows={rows}
                value={value}
                onChange={onChange}
                {...props}
            />
        </FormGroup>
    );
};

export default TextArea;