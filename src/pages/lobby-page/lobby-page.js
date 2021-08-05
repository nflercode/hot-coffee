import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import tableService from '../../services/table-service';
import playerService from '../../services/player-service';
import refreshTokenStorage from '../../storage/refresh-token-storage';
import { useHistory } from 'react-router';
import LazyLoad from 'react-lazyload';
import { Button } from '../../components/button/button'

import './style.css';
import axios from 'axios';
import gameService from '../../services/game-service';

const imageHostBaseUrl = 'https://nimage.nfler.se';

const LobbyPage = () => {
  const tableState = useSelector(state => state.table);
  const authState = useSelector(state => state.auth);
  const gameState = useSelector(state => state.game);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getTable() {
        const tableResp = await tableService.getTable(authState.authToken.token);
        dispatch({ type: "CREATE_TABLE", table: tableResp.data });
    }

    if (authState.authToken.token)
        getTable();

  }, [authState.authToken, dispatch]);

  useEffect(() => {
    if (gameState.status === "ONGOING") {
      history.push('/game');
    }
  }, [gameState, history]);

  function handleLeaveTable() {
    async function leave() {
      await playerService.deletePlayer(authState.authToken.token);
      refreshTokenStorage.deleteRefreshToken();
      dispatch({ type: "PLAYER_LEFT_TABLE" });
      history.push('/');
    }

    leave();
  }

  return (
    <div className="lobby-page-container">
      <header className="lobby-page-header">
        <div className="lobby-page-header-upper-header">
          <span>url: {window.origin}/join/{tableState.invitationToken}</span>
          <button className="lobby-page-header-leave-table-button" onClick={handleLeaveTable}>Lämna bord</button>
        </div>
        <div>
          <h1 className="lobby-page-header-table-name">{tableState.name}</h1>
        </div>
      </header>
      <main className="lobby-page-main">
        <div className="lobby-player-list">
          {
            tableState.players && tableState.players.map((player, i) => (
              <div className="lobby-player-list-item" key={`player-list-item-${i}`}>
                <div>
                  <LazyLoad height={60}>
                    <img alt={`Avatar for ${player.avatar.name}`} src={`${imageHostBaseUrl}/${player.avatar.imageName}`} />
                  </LazyLoad>
                </div>
                <div className="lobby-player-list-item-name-section">
                  <span className="lobby-player-list-item-name-section-avatar-name">{player.avatar.name}</span>
                  <span className="lobby-player-list-item-name-section-player-name">Aka: <span>{player.name}</span> {player.isMe && <span>*</span>}</span>
                </div>
              </div>
            ))
          }
        </div>
        <Button onClick={() => gameService.createGame(authState.authToken.token)}>Starta spel</Button>
      </main>
    </div>
  );
};

export default LobbyPage;