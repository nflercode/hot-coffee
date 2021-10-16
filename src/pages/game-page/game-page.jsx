import React, { useEffect, useMemo, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import tableService from "../../services/table-service";
import { DialogsContext } from "../../components/dialogs/dialogs-context";

import "./style.css";
import gameService from "../../services/game-service";
import { GAME_CREATED } from "../../store/reducers/game-reducer";
import { POT_REQUEST_FETCHED } from "../../store/reducers/pot-request";

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
import useIsHorizontal from "../../components/hooks/is-horizontal";
import { Alert } from "../../components/dialogs/alert";
import { ACTION_FETCHED } from "../../store/reducers/actions-reducer";
import { usePotRequestDialog } from "./dialogs/use-pot-request-dialog";
import { PlayerParticipantList } from "./player-participant-list";
import {
    useBreakpoint,
    breakoointConstants
} from "../../components/hooks/use-breakpoint";
import { fetchChips } from "../../store/actions/chips-action";
import statusConstants from "../../store/constants/status-constants";
import { Spinner } from "../../components/spinner/spinner";
import { GameSettings } from "./game-settings/game-settings";
const { error, loading, fulfilled } = statusConstants;

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
    const { chipsError, chipsStatus } = useSelector(participantPlayerSelector);

    const dialogerinos = useContext(DialogsContext);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myParticipant, dialogerinos, potRequestState.status]);

    useEffect(() => {
        if (gameState.status === "ENDED") {
            history.push("/game-summary");
        }
    }, [gameState.status]);

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

            dispatch(fetchChips(authState.authToken.token));

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

    if (chipsStatus === loading) {
        return <Spinner />;
    }

    if (chipsStatus === error) {
        console.log(chipsError);
        return <Alert title="Error" icon="fa-exclamation" />;
    }

    if (!isHorizontal) {
        return <Alert title="Rotate the screen" icon="fa-exclamation" />;
    }

    return (
        <div className="game-page-container">
            <GameSettings />
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
