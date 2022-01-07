import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBuyInState } from "../../../components/hooks/use-buy-in-state";
import { gameActionsForCurrentGameRound } from "../../../selectors/actions-state";
import { authSelector } from "../../../selectors/authState";
import { gameSelector } from "../../../selectors/game-state";
import gameService from "../../../services/game-service";
import { buyIn } from "../../../store/actions/bet-actions";
import { BuyInButton } from "./buy-in-button";
import { CallButton } from "./call-button";
import { CheckButton } from "./check-button";
import { FoldButton } from "./fold-button";
import { RaiseButton } from "./raise-button";

export const BetButtonGroup = ({
    playerParticipant,
    bettingChips,
    resetBettingChips
}) => {
    const dispatch = useDispatch();

    const authState = useSelector(authSelector);
    const gameState = useSelector(gameSelector);

    const gameActions = useSelector(gameActionsForCurrentGameRound);

    const [isBuyInRound, mustBuyIn, buyInPrice] =
        useBuyInState(playerParticipant);

    return (
        <div>
            {isBuyInRound ? (
                <BuyInButton
                    isCurrentTurn={playerParticipant.isCurrentTurn}
                    totalBettingValue={bettingChips.totalValue}
                    mustBuyIn={mustBuyIn}
                    buyInPrice={buyInPrice}
                    onClick={() => {
                        dispatch(
                            buyIn({
                                authToken: authState.authToken.token,
                                chips: bettingChips.chips
                            })
                        );
                        window.gtag("event", "click", {
                            event_category: "button",
                            event_label: "action_buy_in",
                            value: bettingChips.totalBettingValue
                        });
                        resetBettingChips();
                    }}
                />
            ) : (
                <div className="participant-section-button-group">
                    <CallButton
                        playerParticipant={playerParticipant}
                        roundActions={gameActions}
                        currentBettingChips={bettingChips}
                        onClick={() => {
                            gameService.call(
                                authState.authToken.token,
                                gameState.id,
                                bettingChips.chips
                            );
                            window.gtag("event", "click", {
                                event_category: "button",
                                event_label: "call",
                                value: bettingChips.totalBettingValue
                            });
                            resetBettingChips();
                        }}
                    />
                    <RaiseButton
                        playerParticipant={playerParticipant}
                        roundActions={gameActions}
                        currentBettingChips={bettingChips}
                        onClick={() => {
                            gameService.raise(
                                authState.authToken.token,
                                gameState.id,
                                bettingChips.chips
                            );

                            window.gtag("event", "click", {
                                event_category: "button",
                                event_label: "raise",
                                value: bettingChips.totalBettingValue
                            });
                            resetBettingChips();
                        }}
                    />
                    <CheckButton
                        playerParticipant={playerParticipant}
                        roundActions={gameActions}
                        onClick={() => {
                            gameService.check(
                                authState.authToken.token,
                                gameState.id
                            );
                            window.gtag("event", "click", {
                                event_category: "button",
                                event_label: "check"
                            });
                            resetBettingChips();
                        }}
                    />
                    <FoldButton
                        playerParticipant={playerParticipant}
                        roundActions={gameActions}
                        onClick={() => {
                            gameService.fold(
                                authState.authToken.token,
                                gameState.id
                            );
                            resetBettingChips();
                        }}
                    />
                </div>
            )}
        </div>
    );
};
