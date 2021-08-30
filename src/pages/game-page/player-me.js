import React from "react";
import { Button } from "../../components/button/button";
import { Container } from "../../components/container/container";
import { Player } from "../../components/player/player";
import { ChipList } from "../../components/chip-list/chip-list";

export const PlayerMe = ({
    playerParticipant,
    authState,
    gameState,
    currentBettingChips,
    gameService,
    setCurrentBettingChips,
    classes,
    handleChipClick
}) => (
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
            onReduceClick={(reducedChip) => handleChipClick(reducedChip, -1)}
            larger={playerParticipant.isMe}
        />
        <div className="participant-section-button-group">
            <Button
                disabled={!playerParticipant.isCurrentTurn}
                onClick={() => {
                    gameService.raise(
                        authState.authToken.token,
                        gameState.id,
                        Object.keys(currentBettingChips).map((id) => ({
                            chipId: id,
                            amount: currentBettingChips[id]
                        }))
                    );
                    setCurrentBettingChips({});
                }}
            >
                Call
            </Button>
            <Button
                disabled={!playerParticipant.isCurrentTurn}
                onClick={() => {
                    gameService.raise(
                        authState.authToken.token,
                        gameState.id,
                        Object.keys(currentBettingChips).map((id) => ({
                            chipId: id,
                            amount: currentBettingChips[id]
                        }))
                    );
                    setCurrentBettingChips({});
                }}
            >
                Raise
            </Button>
            <Button
                disabled={!playerParticipant.isCurrentTurn}
                theme="neutral"
                onClick={() =>
                    gameService.check(authState.authToken.token, gameState.id)
                }
            >
                Check
            </Button>
            <Button
                theme="negative"
                disabled={!playerParticipant.isCurrentTurn}
                onClick={() =>
                    gameService.fold(authState.authToken.token, gameState.id)
                }
            >
                Fold
            </Button>
        </div>
    </Container>
);
