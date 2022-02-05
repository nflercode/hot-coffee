import React from "react";
import "./container.css";

export const Container = ({ children, isMaxHeight, className, onClick }) => (
    <div
        onClick={onClick}
        className={`container-component${
            isMaxHeight ? " container-component-max-height" : ""
        }${className ? ` ${className}` : ""}${
            onClick ? ` container-component-clickable` : ""
        }`}
    >
        {children}
    </div>
);
