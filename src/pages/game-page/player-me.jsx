import React, { useMemo } from "react";
import { Container } from "../../components/container/container";
import { Player } from "../../components/player/player";
import { ChipList } from "../../components/chip-list/chip-list";
import { useBettingChipsState } from "../../components/hooks/use-betting-chips-state";
import { BetButtonGroup } from "./bet-buttons/bet-button-group";
import { MinimumBet } from "./minimum-bet";

export const PlayerMe = ({ playerParticipant, classes }) => {
    const [
        bettingChips,
        increaseBettingChips,
        decreaseBettingChips,
        resetBettingChips
    ] = useBettingChipsState();

    const memoizedChips = useMemo(
        () =>
            playerParticipant.chips.map((chip) => {
                const bettingChip = bettingChips.chips.find(
                    (bettingChip) => bettingChip.id === chip.id
                );

                return {
                    ...chip,
                    amount: chip.amount - (bettingChip?.amount || 0)
                };
            }),
        [playerParticipant.chips, bettingChips]
    );

    return (
        <Container className={classes}>
            <div className="player-me-avatar">
                <Player playerParticipant={playerParticipant} />
            </div>
            <ChipList
                chips={memoizedChips}
                hasEnabledChips={playerParticipant.isCurrentTurn}
                onChipClick={(chip) =>
                    chip.amount > 0 && increaseBettingChips(chip)
                }
                onReduceClick={(chip) => decreaseBettingChips(chip)}
                isLarger={playerParticipant.isMe}
            />
            <BetButtonGroup
                playerParticipant={playerParticipant}
                bettingChips={bettingChips}
                resetBettingChips={resetBettingChips}
            />
            <MinimumBet
                playerParticipant={playerParticipant}
                bettingChips={bettingChips}
            />
        </Container>
    );
};
