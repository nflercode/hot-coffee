import React, { useEffect, useState } from 'react';

import './style.css'

import {  useSelector, useDispatch } from 'react-redux';

import tableService from '../../services/table-service';
import playerService from '../../services/player-service';
import tokenService from '../../services/token-service';

import refreshTokenStorage from '../../storage/refresh-token-storage';
import { useHistory } from 'react-router';

export const StartPage = () => {
  const [ tableInvitationToken, setTableInvitationToken ] = useState("");
  const history = useHistory();
  const table = useSelector((state) => state.table);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.refreshToken)
      return;

    handleRefreshTokenClick();
  }, []);

  useEffect(() => {
    if (!auth.authToken.token)
      return;

    async function fetchTable() {
      const data = await tableService.getTable(auth.authToken.token);
      dispatch({ type: "CREATE_TABLE", table: data.data});
    }

    fetchTable();
  }, [auth.authToken])

  function handleCreateTableButtonClick() {
    async function fetchData() {
      const { data } = await tableService.createTable('Mitt första bord!');

      dispatch({type: "CREATE_TABLE", table: data.table});
      dispatch({type: "CREATE_AUTH_TOKEN", authToken: data.authToken});
      dispatch({type: "CREATE_REFRESH_TOKEN", refreshToken: data.refreshToken});
      
      refreshTokenStorage.setRefreshToken(data.refreshToken);
    }

    fetchData();
  }

  function handleTableInvitationTokenButtonClick() {
    async function joinGroup() {
      if (!tableInvitationToken)
        return;

      const { data } = await tableService.joinTable(tableInvitationToken);

      console.log(data.refreshToken.token);
      dispatch({type: "CREATE_TABLE", table: data.table});
      dispatch({type: "CREATE_AUTH_TOKEN", authToken: data.authToken});
      dispatch({type: "CREATE_REFRESH_TOKEN", refreshToken: data.refreshToken});
    }

    joinGroup();
  }

  function handleRefreshTokenClick() {
    async function refreshToken() {
      const { data } = await tokenService.refreshToken(auth.refreshToken.token  );
      dispatch({type: "CREATE_AUTH_TOKEN", authToken: data.authToken});
    }

    refreshToken();
  }

  function handleLeave() {
    async function leave() {
      await playerService.deletePlayer(auth.authToken.token);
    }

    refreshTokenStorage.deleteRefreshToken();
    leave();
  }

  const isObject = (obj) => typeof obj === 'object' && obj !== null;

    return (
    <div className="start-page-container">
      <header className="start-page-header">
        <h1 className="start-page-header-title"><b>n</b>fler</h1>
        <span className="start-page-header-sub-title">Your chip's online</span>
      </header>
      <main className="start-page-main">
        <div className="start-page-main-inv-link-container">
          <input className="start-page-main-inv-link-input" type="text" />
          <button className="start-page-main-inv-link-button">Gå med</button>
        </div>
        <span className="start-page-main-or">Eller</span>
        <div>
          <button className="start-page-main-create-table-button" onClick={() => history.push('/create')}>Skapa bord</button>
        </div>
      </main>
    </div>
    );
}