import React from 'react';
import { Button } from '../button/button';
import { Chip } from '../chip/chip';

import './style.css';

const ChipList = ({
    chips,
    hasEnabledChips,
    currentBettingChips = {},
    onChipClick,
    onReduceClick,
    larger
  }) => (
    <div className="chip-list-container">
      {
        chips.map((chip) => (
            <div className="chip-list-container-chip-holder">
              <Chip
                chip={chip}
                isEnabled={hasEnabledChips}
                larger={larger}
                onClick={(clickedChip) => onChipClick(clickedChip)}/>
              <div className="chip-holder-betting-chips">
                {hasEnabledChips && Object.keys(currentBettingChips).map((id) => (
                  chip.chipId === id && (
                    <>
                      <b>{currentBettingChips[id]}</b>
                      <Button onClick={() => onReduceClick(chip)} theme="negative">-</Button>
                    </>
                  )
                ))}
              </div>
            </div>
          ))
      }
    </div>
  );

export { ChipList }