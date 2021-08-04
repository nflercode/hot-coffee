import React, { useRef, useEffect, useState } from 'react';
import './input.css';

export const Input = ({type, placeholder, value, label, isReadOnly, onChange, onDebouncedChange, onBlur}) => {
    const timer = useRef(null);
    const isMountedRef = useRef(false);
    const [compValue, setCompValue] = useState(value);

    const killTimer = () => {
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = null;
        }
    };

    useEffect(() => {
        setCompValue(value);
    }, [value])
      

    useEffect(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
        killTimer();
      }; 
    }, []);


    const handleDebouncedFunc = (cb, val) => {
        if(!timer.current) {
            cb(val);
        }
        killTimer();

        if(isMountedRef.current) {
            timer.current = setTimeout(() => cb(val), 200);
        } else {
            cb(val);
          }
    };

    return (
        <div className="input">
            <label>
                {label}
            </label>
            <input onChange={(e) => {
                setCompValue(e.target.value);
                if(onChange) {
                    onChange(e.target.value)};
                if(onDebouncedChange) {
                    handleDebouncedFunc(onDebouncedChange, e.target.value);
                }
            } }
                blur={onBlur}
                type={type}
                value={compValue}
                placeholder={placeholder}
                readOnly={isReadOnly}
            />
        </div>)
};
