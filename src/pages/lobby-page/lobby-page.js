import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LazyLoad from "react-lazyload";
import tableService from "../../services/table-service";
import playerService from "../../services/player-service";
import gameService from "../../services/game-service";
import refreshTokenStorage from "../../storage/refresh-token-storage";
import { useHistory } from "react-router";
import { Button } from "../../components/button/button";
import { CopyLink } from "../../components/copy-link/copy-link";
import { GAME_CREATED } from "../../store/reducers/game-reducer";
import "./style.css";
import { authSelector } from "../../selectors/authState";

const imageHostBaseUrl = "https://image.mychips.online/avatars";

const LobbyPage = () => {
    const tableState = useSelector((state) => state.table);
    const authState = useSelector(authSelector);
    const gameState = useSelector((state) => state.game);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        async function getTable() {
            const [{ value: tableResp }, { value: ongoingGameResp }] =
                await Promise.allSettled([
                    tableService.getTable(authState.authToken.token),
                    gameService.getGameOngoing(authState.authToken.token)
                ]);

            dispatch({ type: "CREATE_TABLE", table: tableResp.data });
            if (ongoingGameResp)
                dispatch({
                    type: GAME_CREATED,
                    game: ongoingGameResp.data.game
                });
        }

        if (authState.authToken.token) getTable();
    }, [authState.authToken, dispatch]);

    useEffect(() => {
        if (gameState.status === "ONGOING") {
            history.push("/game");
        }
    }, [gameState, history]);

    function handleLeaveTable() {
        async function leave() {
            await playerService.deletePlayer(authState.authToken.token);
            refreshTokenStorage.deleteRefreshToken();
            dispatch({ type: "PLAYER_LEFT_TABLE" });
            window.gtag("event", "click", {
                event_category: "button",
                event_label: "action_leave_table"
            });
            history.push("/");
        }

        leave();
    }

    return (
        <div className="lobby-page-container">
            <header className="lobby-page-header">
                <div className="lobby-page-header-upper-header">
                    <Button theme={"negative"} onClick={handleLeaveTable}>
                        Lämna bord
                    </Button>
                </div>
                <div>
                    <h2 className="lobby-page-header-table-name">
                        {tableState.name}
                    </h2>
                </div>
            </header>
            <main className="lobby-page-main">
                <div className="lobby-player-list">
                    {tableState.players &&
                        tableState.players.map((player, i) => (
                            <div
                                className="lobby-player-list-item"
                                key={`player-list-item-${i}`}
                            >
                                <div>
                                    <LazyLoad height={60}>
                                        <img
                                            alt={`Avatar for ${player.avatar.name}`}
                                            src={`${imageHostBaseUrl}/${player.avatar.imageName}`}
                                        />
                                    </LazyLoad>
                                </div>
                                <div className="lobby-player-list-item-name-section">
                                    <span className="lobby-player-list-item-name-section-avatar-name">
                                        {player.avatar.name}
                                    </span>
                                    <span className="lobby-player-list-item-name-section-player-name">
                                        Aka: <span>{player.name}</span>{" "}
                                        {player.isMe && <span>*</span>}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
                <div>
                    <CopyLink invitationToken={tableState.invitationToken} />
                </div>

                <Button
                    onClick={() => {
                        window.gtag("event", "click", {
                            event_category: "button",
                            event_label: "action_start_table"
                        });
                        gameService.createGame(authState.authToken.token);
                    }}
                >
                    Starta spel
                </Button>
            </main>
        </div>
    );
};

export default LobbyPage;
