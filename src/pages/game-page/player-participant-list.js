import React, { useEffect, useMemo, useContext } from "react";
import { useSelector } from "react-redux";
import { participantPlayerSelector } from "../../selectors/combined-states";

import { PlayerMe } from "./player-me";
import { Player } from "../../components/player/player";

export const PlayerParticipantList = ({
    memoizedOrderedPlayersClasses,
    isSmall
}) => {
    const participantPlayers = useSelector(participantPlayerSelector);
    if (!participantPlayers || participantPlayers.length < 1) return null;

    return participantPlayers.map((playerParticipant) => {
        if (!playerParticipant) return null;
        const classObj = memoizedOrderedPlayersClasses.find(
            (p) => p.playerId === playerParticipant.id
        );

        let classes = `game-page-participant-container ${
            !playerParticipant.isParticipating ? "participant-inactive" : ""
        }`;

        if (playerParticipant.isMe) classes += " current-participant";
        else
            classes += ` participant-section-${
                isSmall ? "top" : classObj?.className
            }${isSmall ? " small-device" : ""}`;

        return playerParticipant.isMe ? (
            <PlayerMe classes={classes} playerParticipant={playerParticipant} />
        ) : (
            <div className={classes} key={playerParticipant.playerId}>
                <div>
                    <Player playerParticipant={playerParticipant} />
                </div>
                {/** The chip-list is not intresting to see of other players.
                 *  The only thing relevant is total sum IMHO
                 * <ChipList
                    chips={playerParticipant.chips}
                    hasEnabledChips={
                        playerParticipant.isMe &&
                        playerParticipant.isCurrentTurn
                    }
                    larger={playerParticipant.isMe}
                /> */}
            </div>
        );
    });
};
