import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import tableService from "../../services/table-service";

import "./style.css";
import gameService from "../../services/game-service";
import { GAME_CREATED } from "../../store/reducers/game-reducer";
import { POT_REQUEST_FETCHED } from "../../store/reducers/pot-request";

import { authSelector } from "../../selectors/authState";
import { gameSelector } from "../../selectors/game-state";
import { participantPlayerSelector } from "../../selectors/combined-states";
import { GamePot } from "./game-pot";
import useIsHorizontal from "../../components/hooks/is-horizontal";
import { Alert } from "../../components/dialogs/alert";
import { usePotRequestDialog } from "./dialogs/use-pot-request-dialog";
import { PlayerParticipantList } from "./player-participant-list";
import {
    useBreakpoint,
    breakoointConstants
} from "../../components/hooks/use-breakpoint";
import { fetchChips } from "../../store/actions/chips-action";
import { fetchGameActions } from "../../store/actions/game-actions-actions";
import statusConstants from "../../store/constants/status-constants";
import { Spinner } from "../../components/spinner/spinner";
import { GameSettings } from "./game-settings/game-settings";
import { useMyTurnDialog } from "./dialogs/use-my-turn-alert";
import { fetchPotRequest } from "../../store/actions/pot-request-action";
const { error, loading } = statusConstants;

const GamePage = () => {
    const dispatch = useDispatch();
    const isHorizontal = useIsHorizontal();
    const breakpoint = useBreakpoint();

    useMyTurnDialog();
    usePotRequestDialog();

    const authState = useSelector(authSelector);
    const gameState = useSelector(gameSelector);
    const { chipsError, chipsStatus, gameActionsStatus, gameActionsError } =
        useSelector(participantPlayerSelector);

    useEffect(() => {
        if (gameState.status === "ENDED") {
            history.push("/game-summary");
        }
    }, [gameState.status]);

    useEffect(() => {
        if (gameState.id) {
            dispatch(
                fetchGameActions({
                    authToken: authState.authToken.token,
                    gameId: gameState.id,
                    round: gameState.round
                })
            );
        }
    }, [gameState.id, gameState.round, authState.authToken, dispatch]);

    useEffect(() => {
        if (gameState.id) {
            console.log("Fetching potreqeust");
            dispatch(
                fetchPotRequest({
                    gameId: gameState.id,
                    authToken: authState.authToken.token
                })
            );
        }
    }, [gameState.id, authState.authToken.token, dispatch]);

    useEffect(() => {
        // TODO: move this function to a getTableService, this blob is not necessary in the component
        // Also make requests run parlell
        async function getTable() {
            dispatch(fetchChips(authState.authToken.token));

            const tableResp = await tableService.getTable(
                authState.authToken.token
            );
            dispatch({ type: "CREATE_TABLE", table: tableResp.data });

            const ongoingGameResp = await gameService.getGameOngoing(
                authState.authToken.token
            );
            dispatch({ type: GAME_CREATED, game: ongoingGameResp.data.game });
        }

        if (authState.authToken.token) getTable();
    }, [authState.authToken, dispatch]);

    if (
        !gameState.id ||
        chipsStatus === loading ||
        gameActionsStatus === loading
    ) {
        return <Spinner />;
    }

    if (chipsStatus === error || gameActionsStatus === error) {
        console.log(chipsError || gameActionsError);
        return <Alert title="Error" icon="fa-exclamation" />;
    }

    if (!isHorizontal) {
        return <Alert title="Rotate the screen" icon="fa-exclamation" />;
    }

    const isSmall = breakpoint === breakoointConstants.XS;
    return (
        <div className="game-page-container">
            <GameSettings />
            <main className="game-page-main">
                <div className="game-page-pot-container">
                    <GamePot />
                </div>
                <PlayerParticipantList isSmall={isSmall} />
            </main>
        </div>
    );
};

export default GamePage;
