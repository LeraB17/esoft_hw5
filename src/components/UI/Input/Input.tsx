import React, { FC } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { IInputProps } from "./IInputProps";

const Input: FC<IInputProps> = ({ className, label, value, onChange, ...props }) => {
    return (
        <FormGroup className={`w-100 ${className}`}>
            {label && <Form.Label className="text">{label}</Form.Label>}
            <Form.Control
                value={value}
                onChange={onChange}
                {...props}
            />
        </FormGroup>
    );
};

export default Input;
