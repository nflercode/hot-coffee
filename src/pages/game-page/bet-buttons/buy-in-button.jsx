import React from "react";
import { Button } from "../../../components/button/button";

export const BuyInButton = ({
    isCurrentTurn,
    totalBettingValue,
    mustBuyIn,
    buyInPrice,
    onClick
}) => {
    const isAllowedToBuyIn = () =>
        isCurrentTurn && mustBuyIn && totalBettingValue === buyInPrice;

    return (
        <Button disabled={!isAllowedToBuyIn()} onClick={onClick}>
            Buy in {buyInPrice}$
        </Button>
    );
};
