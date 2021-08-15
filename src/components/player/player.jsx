import React, { useState } from 'react';
import LazyLoad from 'react-lazyload';
import './player.css';
const imageHostBaseUrl = 'https://image.mychips.online/avatars';

export const Player = ({ playerParticipant }) => {
  const [showCash, setShowCash] = useState(false);

  const onClick = () => {
    if (showCash) {
      setShowCash(false);
      return;
    }

    setShowCash(true);
  };

  return (
    <div
      onClick={onClick}
      className={`player${
        playerParticipant.isCurrentTurn ? ' player-active' : ''
      }`}
    >
      <div className='player-badge'>
        {playerParticipant.isWorst && !playerParticipant.isBest && (
          <span>
            <i className='fas fa-trash fc-grey' />
          </span>
        )}
        {playerParticipant.isBest && !playerParticipant.isWorst && (
          <span>
            <i className='fas fa-crown fc-gold' />
          </span>
        )}
      </div>

      <div className='player-avatar'>
        <LazyLoad height={60}>
          <img
            width={50}
            alt={`Avatar for ${playerParticipant.avatar.name}`}
            src={`${imageHostBaseUrl}/${playerParticipant.avatar.imageName}`}
          />
        </LazyLoad>
      </div>
      <div className='player-name f-center'>
        {playerParticipant.name}{' '}
        <b>
          {showCash ? (
            <>
              <br />
              {playerParticipant.totalValue}$
            </>
          ) : (
            `#${playerParticipant.turnOrder}`
          )}
        </b>
      </div>
    </div>
  );
};
