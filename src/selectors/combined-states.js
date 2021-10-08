/**
 * Combined selectors for gamestate + tablestate
 */

import { actionsSelector } from "./actions-state";
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
    const actionsState = actionsSelector(state);

    if (!(players && participants && chipsState))
        return { data: [], chipsError: chipsError, status: status };

    const mapChipWithActualChip = (chip) => {
        if (!chipsState || chipsState < 1) return { ...chip };
        const actualChip = chipsState.find(
            (actualChip) => actualChip.id === chip.chipId
        );

        return { ...actualChip, ...chip };
    };

    const mappedPlayers = players.map((player) => {
        const participant = participants.find(
            (participant) => participant.playerId === player.id
        );
        if (!participant) return;
        const mappedChips = participant.chips.map(mapChipWithActualChip);
        const participantActions = actionsState
            .filter((action) => action.playerId === player.id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        let totalValue = 0;
        mappedChips.forEach((chip) => {
            totalValue = totalValue + chip.amount * chip.value;
        });

        return {
            ...participant,
            ...player,
            chips: mappedChips,
            totalValue,
            actions: participantActions
        };
    });

    if (!mappedPlayers || mappedPlayers.length < 1) return null;
    let highestValuePlayer = { value: null, player: null };
    let lowestValuePlayer = { value: null, player: null };
    mappedPlayers.forEach(({ totalValue, playerId }) => {
        if (
            highestValuePlayer.value === null ||
            totalValue > highestValuePlayer.value
        ) {
            highestValuePlayer.value = totalValue;
            highestValuePlayer.player = playerId;
        } else if (
            lowestValuePlayer.value === null ||
            totalValue < lowestValuePlayer.value
        ) {
            lowestValuePlayer.value = totalValue;
            lowestValuePlayer.player = playerId;
        }
    });

    return {
        data: mappedPlayers.map((player) => {
            return {
                ...player,
                isBest: highestValuePlayer.player === player.playerId,
                isWorst: lowestValuePlayer.player === player.playerId
            };
        }),
        status: chipsStatus
    };
};

const mapChipWithActualChip = (state, chip) => {
    const actualChip = chipSelector(state).find(
        (actualChip) => actualChip.id === chip.chipId
    );

    return {
        ...actualChip,
        ...chip
    };
};

const potChipsSelector = (state) => {
    const game = gameSelector(state);
    return game?.pot?.map((chip) => mapChipWithActualChip(state, chip));
};
export { participantPlayerSelector, potChipsSelector };
