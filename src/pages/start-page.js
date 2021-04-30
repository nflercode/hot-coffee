import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client'
import axios from 'axios';
import {  useSelector, useDispatch } from 'react-redux';

export const StartPage = () => {
    
  const [ auth, setAuth ] = useState({});
  //const [ table, setTable ] = useState();
  const [ tableInvitationToken, setTableInvitationToken ] = useState("");
  const table = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!table)
      return;

    console.log('table', table);
    const socket = io('https://api.pr-6.nfler.se/', {
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
      dispatch({ type: "PLAYER_JOINED", player: player });
    });
  }, [table]);

  function handleCreateTableButtonClick() {
    async function fetchData() {
      const { data } = await axios.post('https://api.pr-6.nfler.se/poker/tables', { name: 'My first group'});

      setAuth({authToken: data.authToken.token, refreshToken: data.refreshToken.token});
      dispatch({type: "CREATE_TABLE", table: data.table});
    }

    fetchData();
  }

  function handleTableInvitationTokenButtonClick() {
    async function joinGroup() {
      if (!tableInvitationToken)
        return;

      const { data } = await axios.post(`https://api.pr-6.nfler.se/poker/tables/${tableInvitationToken}`);

      setAuth({authToken: data.authToken.token, refreshToken: data.refreshToken.token});
      console.log(data.refreshToken.token);
      dispatch({type: "CREATE_TABLE", table: data.table});
    }

    joinGroup();
  }

  function handleRefreshTokenClick() {
    async function refreshToken() {
      const { data } = await axios.post(`https://api.pr-6.nfler.se/auth/refresh-token`, { refreshToken: auth.refreshToken });
      setAuth({ ...auth, authToken: data.authToken.token });
      console.log('refreshed auth');
    }

    refreshToken();
  }

  function handleLeave() {
    async function leave() {
      await axios.delete(`https://api.pr-6.nfler.se/poker/players`, { headers: { Authorization: `bearer ${auth.authToken}` }});
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