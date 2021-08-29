import React, { useEffect, useMemo, useState, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import tableService from "../../services/table-service";
import { PlayerMe } from "./player-me";
import { DialogsContext } from "../../components/dialogs/dialogs-context";

import "./style.css";
import gameService from "../../services/game-service";
import { GAME_CREATED } from "../../store/reducers/game-reducer";
import chipService from "../../services/chips-service";
import { CHIPS_FETCHED } from "../../store/reducers/chips-reducer";
import { POT_REQUEST_FETCHED } from "../../store/reducers/pot-request";

import { Button } from "../../components/button/button";
import { ChipList } from "../../components/chip-list/chip-list";
import { Player } from "../../components/player/player";
import { playerMeSelector, playersSeletor } from "../../selectors/table-state";
import { authSelector } from "../../selectors/authState";
import {
    gameSelector,
    myParticipantSelector,
    participantsSelector
} from "../../selectors/game-state";
import { potSelector } from "../../selectors/pot-request-state";
import { participantPlayerSelector } from "../../selectors/combined-states";
import { GamePot } from "./game-pot";
import usePrevious from "../../helpers/use-previous";
import useIsHorizontal from "../../components/hooks/is-horizontal";
import { Container } from "../../components/container/container";
import { Alert } from "../../components/dialogs/alert";
const GamePage = () => {
    const authState = useSelector(authSelector);
    const gameState = useSelector(gameSelector);
    const potRequestState = useSelector(potSelector);
    const playerMe = useSelector(playerMeSelector);
    const myParticipant = useSelector((state) =>
        myParticipantSelector(state, playerMe?.id)
    );
    const participants = useSelector(participantsSelector);
    const players = useSelector(playersSeletor);
    const participantPlayers = useSelector(participantPlayerSelector);
    const dialogerinos = useContext(DialogsContext);
    const [currentBettingChips, setCurrentBettingChips] = useState({});

    const prevPotRequestStatus = usePrevious(potRequestState.status);

    const dispatch = useDispatch();

    const meId = playerMe?.id;

    const isHorizontal = useIsHorizontal();

    const memoizedOrderedPlayersClasses = useMemo(() => {
        if (!(players && participants)) return [];

        const leftTopRight = ["left", "top", "right"];
        return participants
            .filter((p) => p.playerId !== meId)
            .sort((a, b) => a.turnOrder - b.turnOrder)
            .map((p, i) => ({
                playerId: p.playerId,
                className: leftTopRight[i]
            }));
    }, [meId, participants, players]);

    useEffect(() => {
        if (
            myParticipant?.isCurrentTurn &&
            potRequestState.status !== "AWAITING" &&
            isHorizontal
        ) {
            dialogerinos.onShowDialog({
                type: "ALERT",
                title: "Det är din tur!",
                icon: "fa-dice"
            });
        }
    }, [myParticipant, dialogerinos, potRequestState.status]);

    useEffect(() => {
        const requestingPlayer = participantPlayers.find(
            (p) => p.playerId === potRequestState.playerId
        );
        if (
            requestingPlayer?.isMe &&
            potRequestState.status === "APPROVED" &&
            prevPotRequestStatus === "AWAITING"
        ) {
            gameService.nextRound(authState.authToken.token, gameState.id);
        }
    }, [participantPlayers, potRequestState.status]);

    useEffect(() => {
        if (potRequestState.status !== "AWAITING") {
            return;
        }

        const requestingPlayer = participantPlayers.find(
            (p) => p.playerId === potRequestState.playerId
        );
        if (!requestingPlayer || requestingPlayer.isMe) {
            return;
        }

        const isMePlayer = participantPlayers.find((p) => p.isMe);
        const myAnswer = potRequestState.participantAnswers.find(
            (p) => p.playerId === isMePlayer.playerId
        );
        if (myAnswer && myAnswer.answer !== "AWAITING") {
            return;
        }

        dialogerinos.onShowDialog({
            mode: "info",
            positiveButtonProp: {
                callback: () => {
                    gameService.updatePotRequest(
                        authState.authToken.token,
                        potRequestState.id,
                        "OK"
                    );
                },
                content: "I accept"
            },
            negativeButtonProp: {
                callback: () => {
                    gameService.updatePotRequest(
                        authState.authToken.token,
                        potRequestState.id,
                        "NO"
                    );
                },
                content: "I deny"
            },
            message: (
                <div>
                    <b>{requestingPlayer.name}</b> is requesting to receive the
                    pot.
                    <br />
                    <br />
                    <i>If approved: this will also start a new round.</i>
                </div>
            ),
            title: `${requestingPlayer.name} is requesting the pot.`
        });
    }, [participantPlayers, potRequestState]);

    useEffect(() => {
        // TODO: move this function to a getTableService, this blob is not necessary in the component
        // Also make requests run parlell
        async function getTable() {
            const tableResp = await tableService.getTable(
                authState.authToken.token
            );
            dispatch({ type: "CREATE_TABLE", table: tableResp.data });

            const ongoingGameResp = await gameService.getGameOngoing(
                authState.authToken.token
            );
            dispatch({ type: GAME_CREATED, game: ongoingGameResp.data.game });

            const chipsResponse = await chipService.getChips(
                authState.authToken.token
            );
            dispatch({ type: CHIPS_FETCHED, chips: chipsResponse.data.chips });

            const potRequestData = await gameService.getAwaitingPotRequest(
                authState.authToken.token,
                ongoingGameResp.data.game.id
            );
            if (potRequestData.data.potRequest)
                dispatch({
                    type: POT_REQUEST_FETCHED,
                    potRequest: potRequestData.data.potRequest
                });
        }

        if (authState.authToken.token) getTable();
    }, [authState.authToken, dispatch]);

    function handleChipClick(chip, incDec) {
        const newAmount = (currentBettingChips[chip.chipId] || 0) + incDec;
        if (newAmount < 0 || newAmount > chip.amount) {
            return;
        }

        setCurrentBettingChips({
            ...currentBettingChips,
            [chip.chipId]: newAmount
        });
    }

    if (!isHorizontal) {
        return <Alert title="Rotate the screen" icon="fa-exclamation" />;
    }

    return (
        <div className="game-page-container">
            <main className="game-page-main">
                <div className="game-page-pot-container">
                    <GamePot />
                </div>
                {participantPlayers &&
                    participantPlayers.map((playerParticipant) => {
                        if (!playerParticipant) return null;
                        const classObj = memoizedOrderedPlayersClasses.find(
                            (p) => p.playerId === playerParticipant.id
                        );

                        let classes = `game-page-participant-container ${
                            !playerParticipant.isParticipating
                                ? "participant-inactive"
                                : ""
                        }`;

                        if (playerParticipant.isMe)
                            classes += " current-participant";
                        else
                            classes += ` participant-section-${classObj?.className}`;

                        return playerParticipant.isMe ? (
                            <PlayerMe
                                classes={classes}
                                playerParticipant={playerParticipant}
                                authState={authState}
                                gameState={gameState}
                                currentBettingChips={currentBettingChips}
                                gameService={gameService}
                                setCurrentBettingChips={setCurrentBettingChips}
                                handleChipClick={handleChipClick}
                            />
                        ) : (
                            <div
                                className={classes}
                                key={playerParticipant.playerId}
                            >
                                <div>
                                    <Player
                                        playerParticipant={playerParticipant}
                                    />
                                </div>
                                <ChipList
                                    chips={playerParticipant.chips}
                                    hasEnabledChips={
                                        playerParticipant.isMe &&
                                        playerParticipant.isCurrentTurn
                                    }
                                    currentBettingChips={currentBettingChips}
                                    onChipClick={(clickedChip) =>
                                        handleChipClick(clickedChip, 1)
                                    }
                                    onReduceClick={(reducedChip) =>
                                        handleChipClick(reducedChip, -1)
                                    }
                                    larger={playerParticipant.isMe}
                                />
                            </div>
                        );
                    })}
            </main>
        </div>
    );
};

export default GamePage;
