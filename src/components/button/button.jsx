import React from "react";
import "./button.css";

//Button theme can only be one of default, positive, negative or nostyle
export const Button = ({
    // eslint-disable-next-line no-empty-function
    onClick = () => {},
    block,
    children,
    theme = "default",
    disabled,
    referenceElement
}) => {
    return (
        <button
            className={`button${block ? " button-block" : ""} button-${theme}${
                disabled ? " button-disabled" : ""
            }`}
            onClick={() => {
                !disabled && onClick();
            }}
            ref={referenceElement}
        >
            {children}
        </button>
    );
};
