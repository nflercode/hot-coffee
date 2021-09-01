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
    larger
}) => (
    <div className={`chip-list-container ${larger ? "larger" : ""}`}>
        {chips.map((chip) =>
            chip.type ? (
                <div
                    key={`_${chip.type}_${chip.amount}`}
                    className="chip-list-container-chip-holder"
                >
                    <Chip
                        chip={chip}
                        isEnabled={hasEnabledChips}
                        larger={larger}
                        onClick={(clickedChip) => onChipClick(clickedChip)}
                    />
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
