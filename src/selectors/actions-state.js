import { gameSelector } from "./game-state";

const gameActionsSelector = ({ gameActions }) => gameActions;

const gameActionsForCurrentGameRound = (state) => {
    const gameActionsState = gameActionsSelector(state);
    const gameState = gameSelector(state);
    if (!gameState) return [];

    return gameActionsState.data.filter(
        (gameAction) => gameAction.gameRound === gameState.round
    );
};

export { gameActionsSelector, gameActionsForCurrentGameRound };
