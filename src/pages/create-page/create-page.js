import React, { useEffect, useState } from 'react';

import {  useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import tableService from '../../services/table-service';

import './style.css';

const CreatePage = () => {
    const tableState = useSelector((state) => state.table);
    const authState = useSelector((state) => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();
    const [tableName, setTableName] = useState(tableState.name || '');

    useEffect(() => {
        async function getTable() {
            const { data } = await tableService.getTable(authState.authToken.token);
            dispatch({type: "CREATE_TABLE", table: data});
        }

        // create table if no refreshToken exists
        if (authState.authToken.token && !tableState.id)
            getTable();

    }, [authState, dispatch, tableState.id]);

    useEffect(() => {
        setTableName(tableState.name);
    }, [tableState.name])

    function handleChangeNameClick() {
        async function changeTableName() {
            const tableResp = await tableService.setTableName(authState.authToken.token, tableName);
            dispatch({ type: "TABLE_NAME_CHANGE", name: tableResp.data.name });
        }

        changeTableName();
    }

    return (
        <main className="create-page-main">
            <div className="create-page-main-table-name">
                <label>Namn</label>
                <input type="text" value={tableName} onChange={(e) => setTableName(e.target.value)} />
                <button onClick={handleChangeNameClick}>Byt namn</button>
            </div>
            <div className="create-page-main-available-seats">
                <span>Platser vid bordet: 4 st</span>
            </div>
            <div className="create-page-main-connect-url">
                <input type="text" readOnly value={`https://nfler.se/join/${tableState.invitationToken}`}/>
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