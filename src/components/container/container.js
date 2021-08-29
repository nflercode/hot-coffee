import React from "react";
import "./container.css";

export const Container = ({ children, isMaxHeight, className, key }) => (
    <div
        key={key}
        className={`container-component${
            isMaxHeight ? " container-component-max-height" : ""
        }${className ? ` ${className}` : ""}`}
    >
        {children}
    </div>
);
