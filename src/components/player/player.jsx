import React from 'react';
import LazyLoad from 'react-lazyload';
import './player.css';
const imageHostBaseUrl = 'https://nimage.nfler.se';

export const Player = ({ playerParticipant }) => (
  <div
    className={`player${
      playerParticipant.isCurrentTurn ? ' player-active' : ''
    }`}
  >
    <div className='player-avatar'>
      <LazyLoad height={60}>
        <img
          width={50}
          alt={`Avatar for ${playerParticipant.avatar.name}`}
          src={`${imageHostBaseUrl}/${playerParticipant.avatar.imageName}`}
        />
      </LazyLoad>
    </div>
    <div className='player-name'>
      {playerParticipant.name} <b>#{playerParticipant.turnOrder}</b>
    </div>
  </div>
);
