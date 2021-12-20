import { useSelector } from "react-redux";
import { SEATS } from "../../constants/seats";
import { gameActionsForRound } from "../../selectors/actions-state";
import { gameSelector } from "../../selectors/game-state";

export const useBuyInState = (playerParticipant) => {
    const game = useSelector(gameSelector);
    const actions = useSelector((state) =>
        gameActionsForRound(state, game.round)
    );

    const { seat } = playerParticipant;
    const { BIG_BLIND, SMALL_BLIND } = SEATS;

    let isBuyInRound, mustBuyIn, buyInPrice;

    if (seat === BIG_BLIND) {
        isBuyInRound = actions.length <= 1;
        mustBuyIn = actions.length === 1;
        buyInPrice = game.bigBuyIn;
    } else if (seat === SMALL_BLIND) {
        isBuyInRound = actions.length === 0;
        mustBuyIn = actions.length === 0;
        buyInPrice = game.smallBuyIn;
    }

    return [isBuyInRound, mustBuyIn, buyInPrice];
};
