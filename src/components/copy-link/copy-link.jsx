import React, { useContext } from "react";
//import './copy-link.css';
import { Button } from "../../components/button/button";
import { Input } from "../../components/input-field/input";
import { DialogsContext } from "../../components/dialogs/dialogs-context";
import "./copy-link.css";

export const CopyLink = ({ invitationToken }) => {
    const dialogerinos = useContext(DialogsContext);
    const handleCopy = () => {
        const copyText = document
            .querySelector("#copy-input")
            .querySelector("input");

        copyText.select();
        copyText.setSelectionRange(0, 99999);

        document.execCommand("copy");

        dialogerinos.onShowDialog({
            type: "ALERT",
            title: "Kopierat",
            icon: "fa-copy"
        });
    };

    return (
        <div className="copy-link-container">
            <Input
                id="copy-input"
                label="Delbar länk"
                type="text"
                isReadOnly
                value={`${window.origin}/join/${invitationToken}`}
            />
            <Button onClick={handleCopy}>
                <i className="fas fa-copy"></i>
            </Button>
        </div>
    );
};
