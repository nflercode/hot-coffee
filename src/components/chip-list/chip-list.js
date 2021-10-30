import React from "react";
import { Button } from "../button/button";
import { Chip } from "../chip/chip";

import "./style.css";

const ChipList = ({
    chips,
    hasEnabledChips,
    currentBettingChips = {},
    onChipClick,
    onReduceClick,
    isLarger,
    isExchangingChips
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
                    {isExchangingChips && chip.amount > 0 && (
                        <Button
                            onClick={() => onReduceClick(chip)}
                            theme="negative"
                        >
                            -
                        </Button>
                    )}
                    <div className="chip-holder-betting-chips">
                        {hasEnabledChips &&
                            currentBettingChips?.chips &&
                            Object.keys(currentBettingChips.chips).map(
                                (id, i) =>
                                    chip.chipId === id && (
                                        <div key={`_currentBettingChip_${i}`}>
                                            <b>
                                                {currentBettingChips.chips[id]}
                                            </b>
                                            <Button
                                                onClick={() =>
                                                    onReduceClick(chip)
                                                }
                                                theme="negative"
                                            >
                                                -
                                            </Button>
                                        </div>
                                    )
                            )}
                    </div>
                </div>
            ) : null
        )}
    </div>
);

export { ChipList };
