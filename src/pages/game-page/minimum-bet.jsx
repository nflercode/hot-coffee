import React from "react";
import { useSelector } from "react-redux";
import { useBuyInState } from "../../components/hooks/use-buy-in-state";
import { PLAYER_ACTIONS } from "../../constants/player-actions";
import { gameActionsForRound } from "../../selectors/actions-state";
import { gameSelector } from "../../selectors/game-state";

export const MinimumBet = ({ playerParticipant, bettingChips }) => {
    const gameState = useSelector(gameSelector);
    const gameActions = useSelector((state) =>
        gameActionsForRound(state, gameState.round)
    );

    const sortedActions = gameActions
        .filter((action) => action.actionType !== PLAYER_ACTIONS.FOLD)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    playerParticipant.actions.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const [isBuyInRound, _, buyInPrice] = useBuyInState(playerParticipant);

    let minimunBetAmount;
    const myLastAction = playerParticipant.actions[0];
    const gameLastAction = sortedActions[0];
    if (isBuyInRound) {
        minimunBetAmount = buyInPrice;
    } else {
        minimunBetAmount =
            (gameLastAction?.totalBettedValue || 0) -
            (myLastAction?.totalBettedValue || 0);
    }

    const isMinimumBetSatisfied = bettingChips.totalValue >= minimunBetAmount;
    return (
        <div className="minimum-bet">
            {playerParticipant.participationStatus !== "PARTICIPATING" ? (
                <span className="minimum-bet-label">
                    {playerParticipant.placing
                        ? `You placed #${playerParticipant.placing}`
                        : "..."}
                </span>
            ) : (
                <>
                    <div>
                        <span className="minimum-bet-label">Min bet</span>
                        <span
                            className={`minimum-bet-output${
                                isMinimumBetSatisfied ? "--satisfied" : ""
                            }`}
                        >
                            {minimunBetAmount}$
                        </span>
                    </div>
                    <div className="minimum-bet-betting-section">
                        <span className="minimum-bet-label">Betting</span>
                        <span
                            className={`minimum-bet-output${
                                isMinimumBetSatisfied ? "--satisfied" : ""
                            }`}
                        >
                            {bettingChips.totalValue}$
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};
