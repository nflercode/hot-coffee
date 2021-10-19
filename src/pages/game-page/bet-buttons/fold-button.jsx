import React from "react";
import { Button } from "../../../components/button/button";
import { canIFold } from "../../../rules/rules";

export const FoldButton = ({ playerParticipant, roundActions, onClick }) => {
    function isAllowedToFold() {
        if (!playerParticipant.isCurrentTurn) return false;

        return canIFold(roundActions, playerParticipant.playerId)[0];
    }

    return (
        <Button
            theme="negative"
            disabled={!isAllowedToFold()}
            onClick={onClick}
        >
            Fold
        </Button>
    );
};
