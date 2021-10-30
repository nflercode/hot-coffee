import React, { useContext, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { DialogsContext } from "../../components/dialogs/dialogs-context";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input-field/input";
import { CopyLink } from "../../components/copy-link/copy-link";
import playerService from "../../services/player-service";
import tableService from "../../services/table-service";
import { Container } from "../../components/container/container";

import "./style.css";
import { authSelector } from "../../selectors/authState";

const CreatePage = () => {
    const tableState = useSelector((state) => state.table);
    const authState = useSelector(authSelector);
    const [tableName, setTableName] = useState("");
    const [playerName, setPlayerName] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();
    const dialogerinos = useContext(DialogsContext);

    useEffect(() => {
        dialogerinos.onShowDialog({
            mode: "info",
            positiveButtonProp: {
                callback: () => {
                    console.log("accepterat");
                },
                content: "Okej"
            },
            message:
                "Vår site funkar tyvärr inte utan kakor. Genom att fortsätta så godkänner du kakor.",
            title: "Vi använder kakor för att levera denna tjänst"
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function getTable() {
            const { data } = await tableService.getTable(
                authState.authToken.token
            );
            dispatch({ type: "CREATE_TABLE", table: data });
        }

        if (authState.authToken.token && !tableState.id) getTable();
    }, [authState, dispatch, tableState.id]);

    useEffect(() => {
        setTableName(tableState.name);

        if (tableState.players)
            setPlayerName(
                tableState.players.find((player) => player.isMe).name
            );
    }, [tableState.name, tableState.players]);

    function handleChangeTableNameClick() {
        async function changeTableName() {
            const tableResp = await tableService.setTableName(
                authState.authToken.token,
                tableName
            );
            dispatch({ type: "TABLE_NAME_CHANGE", name: tableResp.data.name });
        }

        changeTableName();
    }

    function handleChangePlayerNameClick() {
        async function changeTableName() {
            playerService.changePlayerName(
                authState.authToken.token,
                playerName
            );
        }

        changeTableName();
    }

    const handleDone = () => {
        if (tableName) (async () => handleChangeTableNameClick())();
        if (playerName) (async () => handleChangePlayerNameClick())();

        history.push("/lobby");
    };

    return (
        <main className="create-page-main">
            <Container isMaxHeight>
                <h2>Skapa bord</h2>
                <Input
                    label="Alias"
                    type="text"
                    value={playerName}
                    onDebouncedChange={(val) => setPlayerName(val)}
                />
                <div className="create-page-main-table-name">
                    <Input
                        label="Bordets namn"
                        type="text"
                        value={tableName}
                        onDebouncedChange={(val) => setTableName(val)}
                    />
                </div>
                <div>
                    <CopyLink invitationToken={tableState.invitationToken} />
                </div>
                <div className="create-page-main-available-seats">
                    <span>Platser vid bordet: 4 st</span>
                </div>
                <div className="create-page-done-btn">
                    <Button block onClick={handleDone}>
                        Klar
                    </Button>
                </div>
            </Container>
        </main>
    );
};

export default CreatePage;
