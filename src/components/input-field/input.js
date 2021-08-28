import React, { useRef, useEffect, useState } from "react";
import "./input.css";

export const Input = ({
    type,
    id,
    placeholder,
    value,
    label,
    isReadOnly,
    onChange,
    onDebouncedChange,
    onBlur,
}) => {
    const timer = useRef(null);
    const [compValue, setCompValue] = useState(value);

    const killTimer = () => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
    };

    useEffect(() => {
        setCompValue(value);
    }, [value]);

    useEffect(() => {
        return () => {
            killTimer();
        };
    }, []);

    const handleDebouncedFunc = (cb, val) => {
        if (!timer.current) {
            cb(val);
        }
        killTimer();

        timer.current = setTimeout(() => cb(val), 200);
    };

    return (
        <div className="input" id={id}>
            <label>{label}</label>
            <input
                onChange={(e) => {
                    setCompValue(e.target.value);
                    if (onChange) {
                        onChange(e.target.value);
                    }
                    if (onDebouncedChange) {
                        handleDebouncedFunc(onDebouncedChange, e.target.value);
                    }
                }}
                blur={onBlur}
                type={type}
                value={compValue}
                placeholder={placeholder}
                readOnly={isReadOnly}
            />
        </div>
    );
};
