import React from "react";
import { dialogConstants } from "./dialog-constants";
import { Snackbar } from "./snackbar";
import { Alert } from "./alert";
import "./dialogs.css";

export const Dialogs = ({
    type,
    title,
    message,
    positiveButton,
    negativeButton,
    icon,
    mode
}) => {
    if (type === dialogConstants.type.SNACKBAR) {
        return (
            <Snackbar
                mode={mode}
                title={title}
                message={message}
                positiveButton={positiveButton}
                negativeButton={negativeButton}
            />
        );
    } else if (type === dialogConstants.type.ALERT) {
        return <Alert title={title} icon={icon} />;
    }
    return <div>Jag är en dialog</div>;
};
