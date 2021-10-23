import React from "react";
import { Button } from "../../../components/button/button";
import { ChipList } from "../../../components/chip-list/chip-list";
import "./exchanging-chips-container.css";

export const ExchangingChipsContainer = ({
    chips,
    onChipClick,
    onFillWithCurrentChipsClick,
    totalValueDiff
}) => (
    <div className="exchanging-chips-dialog-container">
        <ChipList
            chips={chips}
            larger
            hasEnabledChips
            onChipClick={(chip) => onChipClick(chip, 1)}
            onReduceClick={(chip) => onChipClick(chip, -1)}
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
