import React from 'react';
import './style.css';

const chipClasses = {
  WHITE: 'white',
  RED: 'red',
  BLUE: 'blue',
  GREEN: 'green',
  BLACK: 'black'
};

const Chip = ({chip, isEnabled, larger, onClick}) => {
  return (
    <div
      className={`chip chip-${chipClasses[chip.type]} ${larger ? 'chip-larger' : ''}`}
      onClick={() => isEnabled && onClick(chip)}>
        <b>{chip.amount}</b>
    </div>
  );
}

export { Chip }