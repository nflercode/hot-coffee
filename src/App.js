import React, { useEffect } from 'react';
import { io } from 'socket.io-client'
import axios from 'axios';

export default function App() {
  const [ auth, setAuth ] = React.useState({});
  const [ table, setTable ] = React.useState();
  const [ tableInvitationToken, setTableInvitationToken ] = React.useState("");

  useEffect(() => {
    if (!table)
      return;

    console.log('table', table);
    const socket = io('http://localhost:3000', {
      auth: {
        token: auth.authToken
      }
    });

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('disconnect', () => {
      console.log('disconneted');
    });

    socket.on('player-added', (player) => {
      console.log('player joined', player);
      setTable({
        ...table,
        players: [
          ...table.players,
          player
        ]
      });
    });
  }, [table]);

  function handleCreateTableButtonClick() {
    async function fetchData() {
      const { data } = await axios.post('http://localhost:3000/poker/tables', { name: 'My first group'});

      setAuth({authToken: data.authToken.token, refreshToken: data.refreshToken.token});
      setTable(data.table);
    }

    fetchData();
  }

  function handleTableInvitationTokenButtonClick() {
    async function joinGroup() {
      if (!tableInvitationToken)
        return;

      const { data } = await axios.post(`http://localhost:3000/poker/tables/${tableInvitationToken}`);

      setAuth({authToken: data.authToken.token, refreshToken: data.refreshToken.token});
      console.log(data.refreshToken.token);
      setTable(data.table);
    }

    joinGroup();
  }

  function handleRefreshTokenClick() {
    async function refreshToken() {
      const { data } = await axios.post(`http://localhost:3000/auth/refresh-token`, { refreshToken: auth.refreshToken });
      setAuth({ ...auth, authToken: data.authToken.token });
      console.log('refreshed auth');
    }

    refreshToken();
  }

  function handleLeave() {
    async function leave() {
      await axios.delete(`http://localhost:3000/poker/players`, { headers: { Authorization: `bearer ${auth.authToken}` }});
    }

    leave();
  }

  const isObject = (obj) => typeof obj === 'object' && obj !== null;

  return (
    <>
      <h1>Hello world</h1>
      <button onClick={handleCreateTableButtonClick}>Skapa bord :)</button>
      <br/>
      <input type="text" onChange={(e) => setTableInvitationToken(e.target.value)} />
      <button onClick={handleTableInvitationTokenButtonClick}>Gå med i bord</button>
      <button onClick={handleRefreshTokenClick}>Ladda om auth token</button>
      <button onClick={handleLeave}>Lämna</button>

      {
        Object.keys((table || {})).map((key) => (<div>{isObject(table[key]) ? '' : table[key]}</div>))
      }
      {
        ((table || {}).players || []).map((player) => <div>{player.name}</div>)
      }
    </>
  );
}
