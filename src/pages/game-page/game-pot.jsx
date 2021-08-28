import React from "react";
import { useSelector } from "react-redux";

import { potChipsSelector } from "../../selectors/combined-states";
import { ChipList } from "../../components/chip-list/chip-list";
import { Button } from "../../components/button/button";
import gameService from "../../services/game-service";
import { authSelector } from "../../selectors/authState";
import { gameSelector } from "../../selectors/game-state";

export const GamePot = () => {
    const potChips = useSelector(potChipsSelector);
    const authState = useSelector(authSelector);
    const gameState = useSelector(gameSelector);

    return (
        <>
            <ChipList
                chips={potChips || []}
                hasEnabledChips={false}
                // eslint-disable-next-line no-empty-function
                onClick={() => {}}
                styleDirection={"row"}
            />
            <Button
                disabled={(potChips || []).length === 0}
                onClick={() =>
                    gameService.createPotRequest(
                        authState.authToken.token,
                        gameState.id
                    )
                }
            >
                <i className="fas fa-hand-holding-usd"></i>
            </Button>
        </>
    );
};
