import React, { useState } from "react";
import LazyLoad from "react-lazyload";
import "./player.css";
const imageHostBaseUrl = "https://image.mychips.online/avatars";

export const Player = ({ playerParticipant }) => {
    const latestPlayerAction = playerParticipant.actions[0];
    return (
        <div
            className={`player${
                playerParticipant.isCurrentTurn ? " player-active" : ""
            }`}
        >
            <div className="player-badge">
                {playerParticipant.isWorst && !playerParticipant.isBest && (
                    <span>
                        <i className="fas fa-trash fc-grey" />
                    </span>
                )}
                {playerParticipant.isBest && !playerParticipant.isWorst && (
                    <span>
                        <i className="fas fa-crown fc-gold" />
                    </span>
                )}
            </div>

            <div className="player-avatar">
                <LazyLoad height={60}>
                    <img
                        width={50}
                        alt={`Avatar for ${playerParticipant.avatar.name}`}
                        src={`${imageHostBaseUrl}/${playerParticipant.avatar.imageName}`}
                    />
                </LazyLoad>
            </div>
            <div className="player-name f-center">
                {playerParticipant.name} <br />
                <b>{playerParticipant.totalValue}$</b> <br />
                {latestPlayerAction && (
                    <PlayerAction latestPlayerAction={latestPlayerAction} />
                )}
            </div>
        </div>
    );
};

const PlayerAction = ({ latestPlayerAction }) => {
    const { actionType, totalValue } = latestPlayerAction;
    return (
        <b className="player-action">
            {actionType} {totalValue > 0 && `${totalValue}$`}
        </b>
    );
};
