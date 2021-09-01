import React from "react";
import { Button } from "../../../components/button/button";
import { canICall } from "../../../rules";

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
        );
    }

    return (
        <Button disabled={!isAllowedToCall()} onClick={onClick}>
            Call
        </Button>
    );
};
