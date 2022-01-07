import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { participantPlayerSelector } from "../../selectors/combined-states";
import { PlayerMe } from "./player-me";
import { Player } from "../../components/player/player";
import { playerMeSelector } from "../../selectors/table-state";

export const PlayerParticipantList = ({ isSmall }) => {
    const { data: participantPlayers } = useSelector(participantPlayerSelector);
    const playerMe = useSelector(playerMeSelector);
    const meId = playerMe?.id;

    const memoizedOrderedPlayersClasses = useMemo(() => {
        if (!participantPlayers || participantPlayers.length < 1) return [];

        const leftTopRight = ["left", "top", "right"];

        return participantPlayers
            .filter((p) => p.playerId !== meId)
            .sort((a, b) => a.turnOrder - b.turnOrder)
            .map((p, i) => ({
                playerId: p.playerId,
                className: leftTopRight[i]
            }));
    }, [meId, participantPlayers]);

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
