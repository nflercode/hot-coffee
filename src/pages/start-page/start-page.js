/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import tableService from "../../services/table-service";
import refreshTokenStorage from "../../storage/refresh-token-storage";
import { Button } from "../../components/button/button";
import playerService from "../../services/player-service";
import { LogoType } from "./logotype";
import { InfoBall } from "../../components/info-ball/info-ball";
import { Container } from "../../components/container/container";
import { authSelector } from "../../selectors/authState";
import { DialogsContext } from "../../components/dialogs/dialogs-context";
import { dialogConstants } from "../../components/dialogs/dialog-constants";

export const StartPage = () => {
    const [isCreatingTable, setIsCreatingTable] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const authState = useSelector(authSelector);
    const dialogerinos = useContext(DialogsContext);

    useEffect(() => {
        dialogerinos.onShowDialog({
            type: dialogConstants.type.SNACKBAR,
            mode: dialogConstants.mode.WARNING,
            positiveButtonProp: {
                // eslint-disable-next-line no-empty-function
                callback: () => {
                    window.gtag("event", "click", {
                        event_category: "button",
                        event_label: "action_alpha_warning"
                    });
                },
                content: "Sure!"
            },
            message:
                "The web app is still under development, but you are of course welcome to test it out!",
            title: "Mychips.online[alpha]"
        });
    }, []);

    function handleLeaveTable() {
        async function leave() {
            await playerService.deletePlayer(authState.authToken.token);
            refreshTokenStorage.deleteRefreshToken();
            dispatch({ type: "PLAYER_LEFT_TABLE" });
            history.push("/");
        }

        window.gtag("event", "click", {
            event_category: "button",
            event_label: "action_leave_table"
        });
        leave();
    }

    function handleCreateTableButtonClick() {
        async function createTable() {
            setIsCreatingTable(true);

            const { data } = await tableService.createTable(
                "Mitt första bord!"
            );

            dispatch({ type: "CREATE_TABLE", table: data.table });
            dispatch({ type: "CREATE_AUTH_TOKEN", authToken: data.authToken });
            dispatch({
                type: "CREATE_REFRESH_TOKEN",
                refreshToken: data.refreshToken
            });

            refreshTokenStorage.setRefreshToken(data.refreshToken);

            window.gtag("event", "click", {
                event_category: "button",
                event_label: "action_create_table"
            });
            history.push("/create");
        }

        createTable();
    }

    return (
        <div className="start-page-container">
            <header className="start-page-header">
                <Container>
                    <LogoType />
                </Container>
            </header>
            <main className="start-page-main">
                <Container isMaxHeight>
                    <div className="start-page-main-content">
                        {!authState.authToken.token ? (
                            <>
                                <div className="start-page-new-player">
                                    <div className="new-player-section">
                                        <InfoBall icon="fa-edit" />
                                        <div className="new-player-text">
                                            <h2 className="fc-white">
                                                Create table
                                            </h2>
                                            <p>
                                                Customize the table to your
                                                liking. No login required!
                                            </p>
                                        </div>
                                    </div>
                                    <div className="new-player-section">
                                        <InfoBall icon="fa-user-plus" />
                                        <div className="new-player-text">
                                            <h2 className="fc-white">
                                                Invite friends
                                            </h2>
                                            <p>
                                                Just send your friends a link
                                                and you're good to go!
                                            </p>
                                        </div>
                                    </div>
                                    <div className="new-player-section">
                                        <InfoBall icon="fa-dice" />
                                        <div className="new-player-text">
                                            <h2 className="fc-white">Play</h2>
                                            <p>
                                                Shuffle your own physical card
                                                deck, We'll keep track of the
                                                chips and who's turn it is!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>
                                    It seems like you are in a lobby alread, do
                                    you want to join it again?
                                </p>
                                <div className="start-page-leave-or-join">
                                    <Button
                                        onClick={() => history.push("/lobby")}
                                    >
                                        To lobby
                                    </Button>
                                    Eller
                                    <Button
                                        theme="negative"
                                        onClick={handleLeaveTable}
                                    >
                                        Leave lobby
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </Container>
            </main>
            <footer className="start-page-footer">
                <Container>
                    <div className="f-center">
                        <Button
                            disabled={isCreatingTable}
                            onClick={handleCreateTableButtonClick}
                        >
                            Create table
                        </Button>
                    </div>
                </Container>
            </footer>
        </div>
    );
};
