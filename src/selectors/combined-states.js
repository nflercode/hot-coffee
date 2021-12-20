/**
 * Combined selectors for gamestate + tablestate
 */

import { gameActionsSelector } from "./actions-state";
import { chipSelector } from "./chip-state";
import { gameSelector, participantsSelector } from "./game-state";
import { playersSeletor } from "./table-state";

const participantPlayerSelector = (state) => {
    const players = playersSeletor(state);
    const participants = participantsSelector(state);
    const {
        data: chipsState,
        status: chipsStatus,
        error: chipsError
    } = chipSelector(state);
    const {
        data: gameActionsState,
        status: gameActionsStatus,
        error: gameActionsError
    } = gameActionsSelector(state);

    if (!players || !participants || !chipsState || !gameActionsState)
        return {
            data: [],
            chipsError,
            chipsStatus,
            gameActionsStatus,
            gameActionsError
        };

    const mappedPlayers = players.map((player) => {
        const participant = participants.find(
            (participant) => participant.playerId === player.id
        );
        if (!participant) return;
        const mappedChips = participant.chips.map((chip) =>
            mapChipWithActualChip(chipsState, chip)
        );
        const participantActions = gameActionsState
            .filter((action) => action.playerId === player.id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        let totalValue = mappedChips.reduce(
            (acc, curr) => acc + curr.value * curr.amount,
            0
        );
        return {
            ...participant,
            ...player,
            chips: mappedChips,
            totalValue,
            actions: participantActions
        };
    });

    if (!mappedPlayers || mappedPlayers.length < 1) return {};

    mappedPlayers.sort((a, b) => b.totalValue - a.totalValue);
    mappedPlayers.at(0).isBest = true;
    mappedPlayers.at(-1).isWorst = true;

    return {
        data: mappedPlayers,
        chipsStatus,
        gameActionsStatus
    };
};

const mapChipWithActualChip = (chipsState, chip) => {
    if (!chipsState || chipsState.length < 1) return { ...chip };
    const actualChip = chipsState.find(
        (actualChip) => actualChip.id === chip.chipId
    );

    return { ...actualChip, ...chip };
};

const potChipsSelector = (state) => {
    const game = gameSelector(state);
    const { data: chipsState } = chipSelector(state);
    return (
        game.pot?.map((chip) => mapChipWithActualChip(chipsState, chip)) || {}
    );
};
export { participantPlayerSelector, potChipsSelector };
