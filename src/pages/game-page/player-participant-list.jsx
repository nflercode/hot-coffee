import React from "react";
import { useSelector } from "react-redux";
import { participantPlayerSelector } from "../../selectors/combined-states";
import { PlayerMe } from "./player-me";
import { Player } from "../../components/player/player";

export const PlayerParticipantList = ({
    memoizedOrderedPlayersClasses,
    isSmall
}) => {
    const { data: participantPlayers } = useSelector(participantPlayerSelector);
    if (!participantPlayers || participantPlayers.length < 1) return null;

    return participantPlayers.map((playerParticipant) => {
        if (!playerParticipant) return null;
        const classObj = memoizedOrderedPlayersClasses.find(
            (p) => p.playerId === playerParticipant.id
        );

        const isParticipating =
            playerParticipant.participationStatus === "PARTICIPATING";
        let classes = `game-page-participant-container ${
            !isParticipating ? "participant-inactive" : ""
        }`;

        if (playerParticipant.isMe) classes += " current-participant";
        else
            classes += ` participant-section-${
                isSmall ? "top" : classObj?.className
            }${isSmall ? " small-device" : ""}`;

        if (playerParticipant.isMe)
            return (
                <React.Fragment key={playerParticipant.playerId}>
                    <PlayerMe
                        classes={classes}
                        playerParticipant={playerParticipant}
                    />
                </React.Fragment>
            );

        return (
            <div className={classes} key={playerParticipant.playerId}>
                <div>
                    <Player playerParticipant={playerParticipant} />
                </div>
            </div>
        );
    });
};
