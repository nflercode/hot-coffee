import React from "react";
import { Button } from "../../../components/button/button";
import { canIRaise } from "../../../rules/rules";

export const RaiseButton = ({
    playerParticipant,
    roundActions,
    currentBettingChips,
    onClick
}) => {
    function isAllowedToRaise() {
        if (!playerParticipant.isCurrentTurn) return false;

        return canIRaise(
            roundActions,
            playerParticipant.playerId,
            currentBettingChips.totalValue
        )[0];
    }
    return (
        <Button disabled={!isAllowedToRaise()} onClick={onClick}>
            Raise
        </Button>
    );
};
