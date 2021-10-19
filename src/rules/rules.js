import { PLAYER_ACTIONS } from "../constants/player-actions.js";

function canICheck(roundActions, playerId) {
    if (roundActions.length < 1) {
        return [false, undefined];
    }

    const [myLastAction, previousBettorAction] =
        getMyLastActionAndPreviousBettorAction(roundActions, playerId);

    if (!previousBettorAction) {
        return [false, undefined];
    }

    if (
        (myLastAction?.totalBettedValue || 0) ===
        previousBettorAction.totalBettedValue
    ) {
        return [true, myLastAction?.totalBettedValue || 0];
    }

    return false;
}

function canICall(roundActions, playerId, bettingValue) {
    // Assert that you are not the first to bet
    if (roundActions.length === 0 || bettingValue === 0) {
        return [false, undefined];
    }

    const [myLastAction, previousBettorAction] =
        getMyLastActionAndPreviousBettorAction(roundActions, playerId);

    if (!previousBettorAction) {
        return false;
    }
    const subTotalBettingValue =
        (myLastAction?.totalBettedValue || 0) + bettingValue;

    if (subTotalBettingValue === previousBettorAction.totalBettedValue) {
        return [true, subTotalBettingValue];
    }

    return [false, undefined];
}

function canIRaise(roundActions, playerId, bettingValue) {
    if (bettingValue === 0) return [false, undefined];
    if (roundActions.length === 0) return [true, bettingValue];

    const [myLastAction, previousBettorAction] =
        getMyLastActionAndPreviousBettorAction(roundActions, playerId);

    if (!previousBettorAction) {
        return [false, undefined];
    }
    const subTotalBettingValue =
        (myLastAction?.totalBettedValue || 0) + bettingValue;

    if (subTotalBettingValue > previousBettorAction.totalBettedValue) {
        return [true, subTotalBettingValue];
    }

    return [false, undefined];
}

function canIFold(roundActions, playerId) {
    if (roundActions.length === 0) {
        return [false, undefined];
    }

    const [myLastAction, previousBettorAction] =
        getMyLastActionAndPreviousBettorAction(roundActions, playerId);

    if (!previousBettorAction) {
        return [false, undefined];
    }

    return [true, myLastAction?.totalBettedValue || 0];
}

function getMyLastActionAndPreviousBettorAction(roundActions, playerId) {
    roundActions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const playerIndex = roundActions.findIndex(
        (action) => action.playerId === playerId
    );
    let endIndex = playerIndex;
    if (endIndex === -1) {
        endIndex = roundActions.length;
    }

    const validRoundActionsFromPlayerLastTurn = roundActions
        .slice(0, endIndex)
        .filter((x) => x.actionType !== PLAYER_ACTIONS.FOLD);

    return [
        roundActions[playerIndex],
        validRoundActionsFromPlayerLastTurn.at(-1)
    ];
}

export { canICheck, canICall, canIFold, canIRaise };
