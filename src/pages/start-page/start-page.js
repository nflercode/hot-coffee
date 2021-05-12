import React, { useState } from 'react';
import './style.css'
import {  useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import tableService from '../../services/table-service';
import refreshTokenStorage from '../../storage/refresh-token-storage';

export const StartPage = () => {
  const [invitationToken, setInvitationToken] = useState("");
  const [isCreatingTable, setIsCreatingTable] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const authState = useSelector((state) => state.auth);

  function handleCreateTableButtonClick() {
    async function createTable() {
      setIsCreatingTable(true);

      const { data } = await tableService.createTable('Mitt första bord!');

      dispatch({type: "CREATE_TABLE", table: data.table});
      dispatch({type: "CREATE_AUTH_TOKEN", authToken: data.authToken});
      dispatch({type: "CREATE_REFRESH_TOKEN", refreshToken: data.refreshToken});
      
      refreshTokenStorage.setRefreshToken(data.refreshToken);

      history.push('/create');
    }

    createTable();
  }

  function handleInvitationTokenClick() {
    history.push(`/join/${invitationToken}`);
  }

  return (
    <div className="start-page-container">
      <header className="start-page-header">
        <h1 className="start-page-header-title"><b>n</b>fler</h1>
        <span className="start-page-header-sub-title">Your chip's online</span>
      </header>
      <main className="start-page-main">
        {!authState.authToken.token && (
          <>
          <div className="start-page-main-inv-link-container">
            <input className="start-page-main-inv-link-input" type="text" onChange={(e) => setInvitationToken(e.target.value)} value={invitationToken} />
            <button className="start-page-main-inv-link-button" onClick={handleInvitationTokenClick}>Gå med</button>
          </div>
          <span className="start-page-main-or">Eller</span>
          </>
        )}
        <div>
          {
            !authState.authToken.token ? (
              <button className="start-page-main-create-table-button" disabled={isCreatingTable} onClick={handleCreateTableButtonClick}>Skapa bord</button>
            ) : (
              <button className="start-page-main-create-table-button" onClick={() => history.push('/lobby')}>Till lobby</button>
            )
          }
          
        </div>
      </main>
    </div>
  );
}