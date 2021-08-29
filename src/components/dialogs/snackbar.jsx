import React, { Suspense, lazy, useContext } from "react";
import { Button } from "../button/button";
import "./snackbar.css";
export const Snackbar = ({
    title,
    message,
    positiveButton,
    negativeButton
}) => (
    <div className="snackbar-container">
        <div className="snackbar-title">{title}</div>
        <div className="snackbar-message">{message}</div>
        <div
            className={`snackbar-btns-container ${
                negativeButton && positiveButton
                    ? "snackbar-btns-container-dual"
                    : "snackbar-btns-container-single"
            }`}
        >
            {positiveButton && (
                <Button
                    block
                    onClick={positiveButton.callback}
                    className="snackbar-positive-button"
                >
                    {positiveButton.content}
                </Button>
            )}
            {negativeButton && (
                <Button
                    theme="negative"
                    block
                    className="snackbar-negative-button"
                    onClick={negativeButton.callback}
                >
                    {negativeButton.content}
                </Button>
            )}
        </div>
    </div>
);
