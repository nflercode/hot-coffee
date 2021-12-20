import React from "react";
import { Button } from "../button/button";
import { Chip } from "../chip/chip";

import "./style.css";

const ChipList = ({
    chips,
    hasEnabledChips,
    onChipClick,
    onReduceClick,
    isLarger
}) => (
    <div className={`chip-list-container ${isLarger ? "larger" : ""}`}>
        {chips.map((chip) =>
            chip.type ? (
                <div
                    key={`_${chip.type}_${chip.amount}`}
                    className="chip-list-container-chip-holder"
                >
                    <Chip
                        chip={chip}
                        isEnabled={hasEnabledChips}
                        isLarger={isLarger}
                        onClick={(clickedChip) => onChipClick(clickedChip)}
                    />
                    {hasEnabledChips && (
                        <Button
                            onClick={() => onReduceClick(chip)}
                            theme="negative"
                            className="reduce-chip-button"
                        >
                            -
                        </Button>
                    )}
                </div>
            ) : null
        )}
    </div>
);

export { ChipList };
