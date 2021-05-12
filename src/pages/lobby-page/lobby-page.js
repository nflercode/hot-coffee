import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import tableService from '../../services/table-service';
import playerService from '../../services/player-service';
import refreshTokenStorage from '../../storage/refresh-token-storage';
import { useHistory } from 'react-router';

import './style.css';

const LobbyPage = () => {
  const tableState = useSelector(state => state.table);
  const authState = useSelector(state => state.auth);
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
          <span>url: https://nfler.se/join/{tableState.invitationToken}</span>
          <button className="lobby-page-header-leave-table-button" onClick={handleLeaveTable}>Lämna bord</button>
        </div>
        <div>
          <h1 className="lobby-page-header-table-name">{tableState.name}</h1>
        </div>
      </header>
      <main className="lobby-page-main">
        <div>
          {
            tableState.players && tableState.players.map((player) => (
              <div>[ICON] <span>{player.name}</span></div>
            ))
          }
        </div>
      </main>
    </div>
  );
};

export default LobbyPage;