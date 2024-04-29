import React from 'react';
import { Dropdown } from 'react-bootstrap';

const MultiSelect = ({ title, options, selectedValues, setSelectedValues }) => {
    const onChangeSelected = (option) => {
        if (selectedValues.includes(option)) {
            setSelectedValues(prev => prev.filter((item) => item !== option));
        } else {
            setSelectedValues(prev => [...prev, option]);
        }
    };

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant="secondary"
                className='w-100'
            >
                {title}
            </Dropdown.Toggle>
            <Dropdown.Menu className='w-100'>
                {options.map((option, index) => (
                    <Dropdown.Item
                        key={index}
                        onClick={() => onChangeSelected(option.value)}
                        active={selectedValues.includes(option.value)}
                    >
                        {option.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default MultiSelect;