import React, { useContext, useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { DialogsContext } from '../../components/dialogs/dialogs-context';
import playerService from '../../services/player-service';
import tableService from '../../services/table-service';
import {Button} from '../../components/button/button';
import { Input } from '../../components/input-field/input';
import './style.css';

const CreatePage = () => {
    const tableState = useSelector((state) => state.table);
    const authState = useSelector((state) => state.auth);
    const [tableName, setTableName] = useState('');
    const [playerName, setPlayerName] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();
    const dialogerinos = useContext(DialogsContext);

    useEffect(() => {
        dialogerinos.onShowDialog({
            mode:"info",
            positiveButtonProp: {
                callback: () => {console.log("accepterat")},
                content:"Okej"
            },
            message: "Vår site funkar tyvärr inte utan kakor. Genom att fortsätta så godkänner du kakor.",
            title: "Vi använder kakor för att levera denna tjänst"
        });
    }, []);
    
    useEffect(() => {
        async function getTable() {
            const { data } = await tableService.getTable(authState.authToken.token);
            dispatch({type: "CREATE_TABLE", table: data});
        }

        if (authState.authToken.token && !tableState.id)
            getTable();

    }, [authState, dispatch, tableState.id]);

    useEffect(() => {
        setTableName(tableState.name);

        if (tableState.players)
            setPlayerName(tableState.players.find(player => player.isMe).name)
    }, [tableState.name, tableState.players])

    function handleChangeTableNameClick() {
        async function changeTableName() {
            const tableResp = await tableService.setTableName(authState.authToken.token, tableName);
            dispatch({ type: "TABLE_NAME_CHANGE", name: tableResp.data.name });
        }

        changeTableName();
    }

    function handleChangePlayerNameClick() {
        async function changeTableName() {
            playerService.changePlayerName(authState.authToken.token, playerName);
        }

        changeTableName();
    }

    const handleDone = () => {
        if (tableName) (async () => handleChangeTableNameClick())();
        if (playerName) (async () => handleChangePlayerNameClick())();
           
        history.push('/lobby');
    }

    return (
        <main className="create-page-main">
            <h2>Skapa bord</h2>
            <Input label="Alias" type="text" value={playerName} onDebouncedChange={(val) => setPlayerName(val)} />
            <div className="create-page-main-table-name">
                <Input label="Bordets namn" type="text" value={tableName} onDebouncedChange={(val) => setTableName(val)} />                    
            </div>
            <div className="create-page-main-connect-url">
                <Input label="Delbar länk" type="text" isReadOnly value={`${window.origin}/join/${tableState.invitationToken}`}/>
                <Button>Copy</Button>
            </div>
            <div className="create-page-main-available-seats">
                <span>Platser vid bordet: 4 st</span>
            </div>
            <div className="create-page-done-btn">
                <Button block onClick={handleDone}>Klar</Button>
            </div>
        </main>
    );
};

export default CreatePage;