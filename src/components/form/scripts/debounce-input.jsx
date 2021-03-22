import React, { useState, useEffect } from "react";
import "../styles/form.css";
import PropTypes from 'prop-types';

export default function DebounceInput({ type, onValidate, onChange }) {
    const [inputText, setInputText] = useState('');
    const [isErrored, setIsErrored] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [isTimeouted, setIsTimeouted] = useState(false);

    useEffect(() => {
        InputResults(inputText);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputText])

    const debouncedInputFunction = () => {
        if (!isTimeouted) {
            //setIsTimeouted(true);
            setIsErrored(!onValidate(inputText));
            //TODO: Fix the debounce timeout
        }
    };

    const InputResults = () => {
        if (inputText.length === 0) {
            return [];
        } else {
            return debouncedInputFunction(inputText);
        }
    };

    if (!type || !onValidate) {
        console.log(new Error("Missing prop in DebounceInput"));
        return null;
    }

    const handleOnChange = (value) => {
        onChange(value);
        setInputText(value);
    }

    return <input className={`input ${isErrored ? 'errored' : ''}`} type={type} onChange={(e) => handleOnChange(e.target.value)} />
}

DebounceInput.propTypes = {
    type: PropTypes.string.isRequired, // could be anyOf...
    onValidate: PropTypes.func.isRequired,
    onChange: PropTypes.func
};

DebounceInput.defaultProps = {
    onChange: () => {}
};