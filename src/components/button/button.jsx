import React from 'react';
import './button.css';

//Button theme can only be one of default, positive or negative
export const Button = ({
  onClick = () => {},
  block,
  children,
  theme = 'default',
  disabled
}) => {
  return (
    <button
      className={`button${block ? ' button-block' : ''} button-${theme}${
        disabled ? ' button-disabled' : ''
      }`}
      onClick={() => {
        !disabled && onClick();
      }}
    >
      {children}
    </button>
  );
};
