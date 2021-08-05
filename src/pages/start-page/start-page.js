import React, { useState } from 'react';
import './style.css'
import {  useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import tableService from '../../services/table-service';
import refreshTokenStorage from '../../storage/refresh-token-storage';
import { Button } from '../../components/button/button';
import playerService from '../../services/player-service';

export const StartPage = () => {
  const [isCreatingTable, setIsCreatingTable] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const authState = useSelector((state) => state.auth);

  function handleLeaveTable() {
    async function leave() {
      await playerService.deletePlayer(authState.authToken.token);
      refreshTokenStorage.deleteRefreshToken();
      dispatch({ type: "PLAYER_LEFT_TABLE" });
      history.push('/');
    }

    leave();
  }
  
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


  return (
    <div className="start-page-container">
      <header className="start-page-header">
        <h2 className="start-page-header-title"><b>n</b>fler</h2>
        <span className="start-page-header-sub-title">Your chip's online</span>
      </header>
      <main className="start-page-main">
        <div>
          {
            !authState.authToken.token ? (
              <Button disabled={isCreatingTable} onClick={handleCreateTableButtonClick}>Skapa bord</Button>
            ) : (
              <>
                <p>Det ser ut som att du är med i ett bord redan</p>
                <div className="start-page-leave-or-join">
                  <Button  onClick={() => history.push('/lobby')}>Till lobby</Button>
                  Eller
                  <Button theme="negative" onClick={handleLeaveTable}>Lämna</Button>
                </div>
              </>
            )
          }
        </div>
      </main>
    </div>
  );
}