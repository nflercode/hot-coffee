import React from "react";
import { Button } from "../../../components/button/button";
import { canICall } from "../../../rules/rules";

export const CallButton = ({
    playerParticipant,
    roundActions,
    currentBettingChips,
    onClick
}) => {
    function isAllowedToCall() {
        if (!playerParticipant.isCurrentTurn) return false;

        return canICall(
            roundActions,
            playerParticipant.playerId,
            currentBettingChips.totalValue
        )[0];
    }

    return (
        <Button disabled={!isAllowedToCall()} onClick={onClick}>
            Call
        </Button>
    );
};
