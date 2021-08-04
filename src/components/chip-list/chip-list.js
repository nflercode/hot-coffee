import React from 'react';
import { Button } from '../button/button';
import { Chip } from '../chip/chip';

import './style.css';

const ChipList = ({
    chips,
    hasEnabledChips,
    currentBettingChips = {},
    onClick,
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
                onClick={(clickedChip) => onClick(clickedChip)}/>
              <div className="chip-holder-betting-chips">
                {hasEnabledChips && Object.keys(currentBettingChips).map((id) => (
                  chip.chipId === id && (
                    <>
                      <b>{currentBettingChips[id]}</b>
                      <span>-</span>
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