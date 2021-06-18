import React, { useContext, useEffect, useState } from 'react';

import {  useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { DialogsContext } from '../../components/dialogs/dialogs-context';
import playerService from '../../services/player-service';
import tableService from '../../services/table-service';

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
        dialogerinos.onShowDialog({});
    }, [])
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

    return (
        <main className="create-page-main">
            <div>
                <label>Alias</label>
                <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                <button onClick={handleChangePlayerNameClick}>Ok</button>
            </div>
            <div className="create-page-main-table-name">
                <label>Bordets namn</label>
                <input type="text" value={tableName} onChange={(e) => setTableName(e.target.value)} />
                <button onClick={handleChangeTableNameClick}>Ok</button>
            </div>
            <div className="create-page-main-available-seats">
                <span>Platser vid bordet: 4 st</span>
            </div>
            <div className="create-page-main-connect-url">
                <input type="text" readOnly value={`${window.origin}/join/${tableState.invitationToken}`}/>
                <button>Copy</button>
            </div>
            <div className="create-page-main-connect-id">
                <span>Anslutnings ID: {tableState.invitationToken}</span>
            </div>
            <div>
                <button onClick={() => history.push('/lobby')}>Gå till lobby</button>
            </div>
        </main>
    );
};

export default CreatePage;