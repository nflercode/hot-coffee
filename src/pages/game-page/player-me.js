import React, { useMemo, useState } from "react";
import { Button } from "../../components/button/button";
import { Container } from "../../components/container/container";
import { Player } from "../../components/player/player";
import { ChipList } from "../../components/chip-list/chip-list";
import rules from "../../rules";
import { useSelector } from "react-redux";
import { actionsForRound } from "../../selectors/actions-state";

export const PlayerMe = ({
    playerParticipant,
    authState,
    gameState,
    gameService,
    classes
}) => {
    const [currentBettingChips, setCurrentBettingChips] = useState({
        chips: {},
        totalValue: 0
    });

    function handleChipClick(chip, incDec) {
        const newAmount =
            (currentBettingChips.chips[chip.chipId] || 0) + incDec;
        if (newAmount < 0 || newAmount > chip.amount) {
            return;
        }

        setCurrentBettingChips({
            ...currentBettingChips,
            chips: {
                ...currentBettingChips.chips,
                [chip.chipId]: newAmount
            },
            totalValue: currentBettingChips.totalValue + incDec * chip.value
        });
    }
    const roundActions = useSelector((state) =>
        actionsForRound(state, gameState.round)
    );

    return (
        <Container key={playerParticipant.playerId} className={classes}>
            <div>
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
                <Button
                    disabled={
                        !playerParticipant.isCurrentTurn ||
                        (playerParticipant.isCurrentTurn &&
                            !rules.canICall(
                                roundActions,
                                playerParticipant.playerId,
                                currentBettingChips.totalValue
                            ))
                    }
                    onClick={() => {
                        gameService.call(
                            authState.authToken.token,
                            gameState.id,
                            Object.keys(currentBettingChips.chips).map(
                                (id) => ({
                                    chipId: id,
                                    amount: currentBettingChips.chips[id]
                                })
                            )
                        );
                        setCurrentBettingChips({ chips: {}, totalValue: 0 });
                    }}
                >
                    Call
                </Button>
                <Button
                    disabled={
                        !playerParticipant.isCurrentTurn ||
                        (playerParticipant.isCurrentTurn &&
                            !rules.canIRaise(
                                roundActions,
                                playerParticipant.playerId,
                                currentBettingChips.totalValue
                            ))
                    }
                    onClick={() => {
                        gameService.raise(
                            authState.authToken.token,
                            gameState.id,
                            Object.keys(currentBettingChips.chips).map(
                                (id) => ({
                                    chipId: id,
                                    amount: currentBettingChips.chips[id]
                                })
                            )
                        );
                        setCurrentBettingChips({});
                    }}
                >
                    Raise
                </Button>
                <Button
                    disabled={
                        !playerParticipant.isCurrentTurn ||
                        (playerParticipant.isCurrentTurn &&
                            !rules.canICheck(
                                roundActions,
                                playerParticipant.playerId
                            ))
                    }
                    theme="neutral"
                    onClick={() =>
                        gameService.check(
                            authState.authToken.token,
                            gameState.id
                        )
                    }
                >
                    Check
                </Button>
                <Button
                    theme="negative"
                    disabled={
                        !playerParticipant.isCurrentTurn ||
                        (playerParticipant.isCurrentTurn &&
                            !rules.canIFold(roundActions))
                    }
                    onClick={() =>
                        gameService.fold(
                            authState.authToken.token,
                            gameState.id
                        )
                    }
                >
                    Fold
                </Button>
            </div>
        </Container>
    );
};
