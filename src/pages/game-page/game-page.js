import React, { useEffect, useMemo, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import tableService from "../../services/table-service";
import { DialogsContext } from "../../components/dialogs/dialogs-context";

import "./style.css";
import gameService from "../../services/game-service";
import { GAME_CREATED } from "../../store/reducers/game-reducer";
import chipService from "../../services/chips-service";
import { CHIPS_FETCHED } from "../../store/reducers/chips-reducer";
import { POT_REQUEST_FETCHED } from "../../store/reducers/pot-request";

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
import { Alert } from "../../components/dialogs/alert";
import { ACTION_FETCHED } from "../../store/reducers/actions-reducer";
import { usePotRequestDialog } from "./dialogs/use-pot-request-dialog";
import { PlayerParticipantList } from "./player-participant-list";
import {
    useBreakpoint,
    breakoointConstants
} from "../../components/hooks/use-breakpoint";

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

    const prevPotRequestStatus = usePrevious(potRequestState.status);

    const dispatch = useDispatch();

    const meId = playerMe?.id;

    const isHorizontal = useIsHorizontal();
    const breakpoint = useBreakpoint();
    const isSmall = breakpoint === breakoointConstants.XS;

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

    // Not 100% sure if happy with this solution.
    // Kind of big risk that the round wont change if the
    // requesting user is not having the page open when the
    // request gets approved, hence the round wont change and
    // the game will break. Maybe let backend take care of round
    // change on approved request. (kind of ugly as well?)
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

    usePotRequestDialog();

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

            const roundActions = await gameService.getGameActionsForRound(
                authState.authToken.token,
                ongoingGameResp.data.game.id,
                ongoingGameResp.data.game.round
            );
            dispatch({
                type: ACTION_FETCHED,
                actions: roundActions.data.actions
            });

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

    if (!isHorizontal) {
        return <Alert title="Rotate the screen" icon="fa-exclamation" />;
    }

    return (
        <div className="game-page-container">
            <main className="game-page-main">
                <div className="game-page-pot-container">
                    <GamePot />
                </div>
                <PlayerParticipantList
                    memoizedOrderedPlayersClasses={
                        memoizedOrderedPlayersClasses
                    }
                    isSmall={isSmall}
                />
            </main>
        </div>
    );
};

export default GamePage;
