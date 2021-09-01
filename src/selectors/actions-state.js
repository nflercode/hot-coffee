const actionsSelector = ({ actions }) => actions;

const actionsForRound = (state, round) => {
    const actionsState = actionsSelector(state);
    return actionsState.filter((action) => action.gameRound === round);
};

export { actionsSelector, actionsForRound };
