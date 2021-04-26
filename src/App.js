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
    const socket = io('https://api.pr-5.nfler.se', {
      auth: {
        token: auth.authToken
      }
    });

    socket.on('connect', () => {
      console.log('connected');
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
      const { data } = await axios.post('https://api.pr-5.nfler.se/poker/tables', { name: 'My first group'});

      setAuth({authToken: data.authToken, refreshToken: data.refreshToken});
      setTable(data.table);
    }

    fetchData();
  }

  function handleTableInvitationTokenButtonClick() {
    async function joinGroup() {
      if (!tableInvitationToken)
        return;

      const { data } = await axios.post(`https://api.pr-5.nfler.se/poker/tables/${tableInvitationToken}`);

      setAuth({authToken: data.authToken, refreshToken: data.refreshToken});
      setTable(data.table);
    }

    joinGroup();
  }

  const isObject = (obj) => typeof obj === 'object' && obj !== null;

  return (
    <>
      <h1>Hello world</h1>
      <button onClick={handleCreateTableButtonClick}>Skapa bord :)</button>
      <br/>
      <input type="text" onChange={(e) => setTableInvitationToken(e.target.value)} />
      <button onClick={handleTableInvitationTokenButtonClick}>Gå med i bord</button>

      {
        Object.keys((table || {})).map((key) => (<div>{isObject(table[key]) ? '' : table[key]}</div>))
      }
      {
        ((table || {}).players || []).map((player) => <div>{player.name}</div>)
      }
    </>
  );
}
