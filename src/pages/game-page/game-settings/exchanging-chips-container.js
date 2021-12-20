import React from "react";
import { Button } from "../../../components/button/button";
import { ChipList } from "../../../components/chip-list/chip-list";
import "./exchanging-chips-container.css";

export const ExchangingChipsContainer = ({
    chips,
    onChipClick,
    onReduceClick,
    onFillWithCurrentChipsClick,
    totalValueDiff
}) => (
    <div className="exchanging-chips-dialog-container">
        <ChipList
            chips={chips}
            isLarger
            hasEnabledChips
            onChipClick={(c) => onChipClick(c)}
            onReduceClick={onReduceClick}
            isExchangingChips
        />
        <div className="exchanging-chips-dialog-tv-container">
            <b
                className={
                    totalValueDiff === 0
                        ? "exchanging-chips-value-diff-ok"
                        : undefined
                }
            >
                ${totalValueDiff}
            </b>
            <Button theme="neutral" onClick={onFillWithCurrentChipsClick}>
                Fill with my chips
            </Button>
        </div>
    </div>
);
