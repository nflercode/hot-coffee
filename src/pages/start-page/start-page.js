import React, { useState } from 'react';
import './style.css'
import {  useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import tableService from '../../services/table-service';
import refreshTokenStorage from '../../storage/refresh-token-storage';
import { Button } from '../../components/button/button';
import playerService from '../../services/player-service';
import { LogoType } from './logotype';
import { InfoBall } from '../../components/info-ball/info-ball';

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
        <LogoType/>
      </header>
      <main className="start-page-main">
        <div>
          {
            !authState.authToken.token ? (
              <div>
                  <h2 className="f-center">Lets start!</h2>
                <div className="start-page-new-player">
                  <InfoBall icon="fa-edit" title="create table"/>
                  <InfoBall icon="fa-user-plus" title="invite friends" />
                  <InfoBall icon="fa-dice" title="play together"/>
                </div>
                <br />
                <br />
                <div className="margin-auto">
                  <Button disabled={isCreatingTable} onClick={handleCreateTableButtonClick}>Create table</Button>
                </div>
              </div>
              ) : (
              <>
                <p>It seems like you are in a lobby alread, do you want to join it again?</p>
                <div className="start-page-leave-or-join">
                  <Button  onClick={() => history.push('/lobby')}>To lobby</Button>
                  Eller
                  <Button theme="negative" onClick={handleLeaveTable}>Leave lobby</Button>
                </div>
              </>
            )
          }
        </div>
      </main>
    </div>
  );
}