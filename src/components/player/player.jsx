import React, { useState } from "react";
import LazyLoad from "react-lazyload";
import { SpeechBubble } from "../speech-bubble/speech-bubble";
import "./player.css";
const imageHostBaseUrl = "https://image.mychips.online/avatars";

export const Player = ({ playerParticipant }) => {
    const latestPlayerAction = playerParticipant.actions[0];
    const [referenceElement, setReferenceElement] = useState(null);

    return (
        <>
            {latestPlayerAction && !playerParticipant.isMe && (
                <SpeechBubble referenceElement={referenceElement}>
                    <PlayerAction latestPlayerAction={latestPlayerAction} />
                </SpeechBubble>
            )}
            {playerParticipant.seat && !latestPlayerAction && (
                <SpeechBubble referenceElement={referenceElement}>
                    <ParticipantSeat seat={playerParticipant.seat} />
                </SpeechBubble>
            )}
            {playerParticipant.isWorst ||
                (playerParticipant.isBest && (
                    <div className="player-badge">
                        {playerParticipant.isWorst &&
                            !playerParticipant.isBest && (
                                <span>
                                    <i className="fas fa-trash fc-grey" />
                                </span>
                            )}
                        {playerParticipant.isBest &&
                            !playerParticipant.isWorst && (
                                <span>
                                    <i className="fas fa-crown fc-gold" />
                                </span>
                            )}
                    </div>
                ))}

            <div
                className={`player${
                    playerParticipant.isCurrentTurn ? " player-active" : ""
                }`}
            >
                <div ref={setReferenceElement} className="player-avatar">
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
                </div>
            </div>
        </>
    );
};

const PlayerAction = ({ latestPlayerAction }) => {
    const { actionType, bettedValue } = latestPlayerAction;
    return (
        <>
            {prettifyActionTypeName(actionType)}{" "}
            {bettedValue > 0 && `${bettedValue}$`}
        </>
    );
};

const prettifyActionTypeName = (actionType) => actionType.replace("_", " ");

const ParticipantSeat = ({ seat }) => {
    return (
        <>
            {seat === "BIG_BLIND" && "BB"}
            {seat === "SMALL_BLIND" && "SB"}
            {seat === "DEALER" && "Dealer"}
        </>
    );
};
