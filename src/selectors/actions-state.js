const gameActionsSelector = ({ gameActions }) => gameActions;

const gameActionsForRound = (state, round) => {
    const gameActionsState = gameActionsSelector(state);
    return gameActionsState.data.filter(
        (gameAction) => gameAction.gameRound === round
    );
};

export { gameActionsSelector, gameActionsForRound };
