import React, { useState } from "react";
import { Container } from "../../components/container/container";
import { Player } from "../../components/player/player";
import { ChipList } from "../../components/chip-list/chip-list";
import { useSelector } from "react-redux";
import { actionsForRound } from "../../selectors/actions-state";
import { CallButton } from "./bet-buttons/call-button";
import { RaiseButton } from "./bet-buttons/raise-button";
import { CheckButton } from "./bet-buttons/check-button";
import { FoldButton } from "./bet-buttons/fold-button";
import { authSelector } from "../../selectors/authState";
import { gameSelector } from "../../selectors/game-state";
import gameService from "../../services/game-service";

export const PlayerMe = ({ playerParticipant, classes, key }) => {
    const currentBettingChipsDefaultState = { chips: {}, totalValue: 0 };
    const [currentBettingChips, setCurrentBettingChips] = useState(
        currentBettingChipsDefaultState
    );
    const authState = useSelector(authSelector);
    const gameState = useSelector(gameSelector);

    function handleChipClick(chip, incDec) {
        const newAmount =
            (currentBettingChips.chips[chip.chipId] || 0) + incDec;

        if (newAmount < 0 || newAmount > chip.amount) {
            return;
        }

        if (newAmount === 0) {
            const { [chip.chipId]: chipToRemove, ...chipsRest } =
                currentBettingChips.chips;
            setCurrentBettingChips({
                ...currentBettingChips,
                chips: {
                    ...chipsRest
                },
                totalValue: currentBettingChips.totalValue + incDec * chip.value
            });
        } else {
            setCurrentBettingChips({
                ...currentBettingChips,
                chips: {
                    ...currentBettingChips.chips,
                    [chip.chipId]: newAmount
                },
                totalValue: currentBettingChips.totalValue + incDec * chip.value
            });
        }
    }

    const roundActions = useSelector((state) =>
        actionsForRound(state, gameState.round)
    );

    function getCurrentBettingChipsAsPlayload() {
        return Object.keys(currentBettingChips.chips).map((id) => ({
            chipId: id,
            amount: currentBettingChips.chips[id]
        }));
    }

    return (
        <Container key={playerParticipant.playerId} className={classes}>
            <div className="player-me-avatar">
                <Player playerParticipant={playerParticipant} />
            </div>
            <ChipList
                chips={playerParticipant.chips}
                hasEnabledChips={
                    playerParticipant.isMe && playerParticipant.isCurrentTurn
                }
                currentBettingChips={currentBettingChips}
                onChipClick={(clickedChip) => handleChipClick(clickedChip, 1)}
                onReduceClick={(reducedChip) =>
                    handleChipClick(reducedChip, -1)
                }
                larger={playerParticipant.isMe}
            />
            <div className="participant-section-button-group">
                <CallButton
                    playerParticipant={playerParticipant}
                    roundActions={roundActions}
                    currentBettingChips={currentBettingChips}
                    onClick={() => {
                        gameService.call(
                            authState.authToken.token,
                            gameState.id,
                            getCurrentBettingChipsAsPlayload()
                        );
                        setCurrentBettingChips(currentBettingChipsDefaultState);
                    }}
                />
                <RaiseButton
                    playerParticipant={playerParticipant}
                    roundActions={roundActions}
                    currentBettingChips={currentBettingChips}
                    onClick={() => {
                        gameService.raise(
                            authState.authToken.token,
                            gameState.id,
                            getCurrentBettingChipsAsPlayload()
                        );
                        setCurrentBettingChips(currentBettingChipsDefaultState);
                    }}
                />
                <CheckButton
                    playerParticipant={playerParticipant}
                    roundActions={roundActions}
                    onClick={() =>
                        gameService.check(
                            authState.authToken.token,
                            gameState.id
                        )
                    }
                />
                <FoldButton
                    playerParticipant={playerParticipant}
                    roundActions={roundActions}
                    onClick={() =>
                        gameService.fold(
                            authState.authToken.token,
                            gameState.id
                        )
                    }
                />
            </div>
        </Container>
    );
};
