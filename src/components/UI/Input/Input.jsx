import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';

const Input = ({ className, label, value, onChange, ...props }) => {
    return (
        <FormGroup className={`w-100 ${className}`}>
            {
                label && <Form.Label className='text'>
                    {label}
                </Form.Label>
            }
            <Form.Control
                value={value}
                onChange={onChange}
                {...props}
            />
        </FormGroup>
    );
};

export default Input;