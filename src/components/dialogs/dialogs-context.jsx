import React, { useState, useRef } from "react";
import { dialogConstants } from "./dialog-constants";

import { Dialogs } from "./dialogs";

export const DialogsContext = React.createContext({});

export const DialogsContextProvider = ({ children }) => {
    const dialogElement = useRef();
    const timer = useRef();
    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);

    const [type, setType] = useState(dialogConstants.type.SNACKBAR);
    const [positiveButton, setPositiveButton] = useState(null);
    const [negativeButton, setNegativeButton] = useState(null);
    const [icon, setIcon] = useState(null);
    const [mode, setMode] = useState(dialogConstants.mode.info);

    const onShowDialog = ({
        type: typeProp = dialogConstants.type.SNACKBAR,
        mode: propMode,
        icon: iconProp,
        positiveButtonProp,
        negativeButtonProp,
        message: messageProp,
        title: titleProp
    }) => {
        setType(typeProp);
        clearTimeout(timer.current);
        setTitle(titleProp);
        setMode(propMode);
        if (messageProp) setMessage(messageProp);
        if (iconProp) setIcon(iconProp);
        if (positiveButtonProp)
            setPositiveButton({
                callback: () => {
                    if (dialogElement.current)
                        dialogElement.current.className = "dialog-invisible";
                    if (positiveButtonProp) positiveButtonProp.callback();
                },
                content: positiveButtonProp.content,
                isDisabled: positiveButtonProp.isDisabled
            });
        if (negativeButtonProp)
            setNegativeButton({
                callback: () => {
                    if (dialogElement.current)
                        dialogElement.current.className = "dialog-invisible";
                    if (negativeButtonProp) negativeButtonProp.callback();
                },
                content: negativeButtonProp.content
            });

        if (dialogElement.current)
            dialogElement.current.className = "dialog-visible";

        if (typeProp === "ALERT") {
            timer.current = setTimeout(() => {
                if (dialogElement.current)
                    dialogElement.current.className = "dialog-invisible";
            }, 1200);
        }
    };

    return (
        <DialogsContext.Provider
            value={{ onShowDialog }}
            data-testid="qa-dialogContext"
        >
            {children}
            <div
                className="dialog-first-render"
                ref={(element) => {
                    dialogElement.current = element;
                }}
            >
                <Dialogs
                    type={type}
                    title={title}
                    message={message}
                    positiveButton={positiveButton}
                    negativeButton={negativeButton}
                    icon={icon}
                    mode={mode}
                />
            </div>
        </DialogsContext.Provider>
    );
};
