import React from "react";
import { Button } from "../../../components/button/button";
import { canICheck } from "../../../rules";

export const CheckButton = ({ playerParticipant, roundActions, onClick }) => {
    function isAllowedToCheck() {
        if (!playerParticipant.isCurrentTurn) return false;

        return canICheck(roundActions, playerParticipant.playerId);
    }

    return (
        <Button
            disabled={!isAllowedToCheck()}
            theme="neutral"
            onClick={onClick}
        >
            Check
        </Button>
    );
};
