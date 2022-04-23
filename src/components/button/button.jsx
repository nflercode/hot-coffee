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
    referenceElement,
    className = "",
    "data-testId": dataTestId
}) => {
    return (
        <button
            data-testId={dataTestId}
            className={`button${block ? " button-block" : ""} button-${theme}${
                disabled ? " button-disabled" : ""
            }${className ? ` ${className}` : ""}`}
            onClick={() => {
                !disabled && onClick();
            }}
            ref={referenceElement}
        >
            {children}
        </button>
    );
};
