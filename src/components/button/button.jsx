import React from 'react';
import './button.css';

//Button theme can only be one of default, positive or negative
export const Button = ({onClick, children, theme = "default", disabled}) => {
    return (
    <button className={`button button-${theme}${disabled ? ' button-disabled' : ''}`} onClick={() => {!disabled && onClick()}}>
        {children}
    </button>
    );
}