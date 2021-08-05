import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import { GAME_CREATED, GAME_UPDATED } from '../../store/reducers/game-reducer';

function setUpMarkerWorld(authToken) {
  const socket = io(`${process.env.REACT_APP_MARKERWORLD_HOST}`, {
    auth: {
      token: authToken
    }
  });

  return socket;
}

function setUpChippie(authToken) {
  const socket = io(`${process.env.REACT_APP_CHIPPIE_HOST}`, {
    auth: {
      token: authToken
    }
  });

  return socket;
}

function handleEventsMarkerWorld(socket, dispatch) {
  socket.on('connect', () => {
    console.log('connected to markerworld');
  });

  socket.on('disconnect', () => {
    console.log('disconneted from markerworld');
  });

  socket.on('player-added', (player) => {
    console.log('player joined', player);
    dispatch({ type: "PLAYER_JOINED", player });
  });

  socket.on('player-removed', (playerId) => {
    console.log('Player removed', playerId);
    dispatch({ type: "PLAYER_REMOVED", playerId });
  });

  socket.on('player-name-change', (player) => {
    console.log('Player name changed', player);
    dispatch({ type: "PLAYER_NAME_CHANGE", player });
  });
}

function handleEventsChippie(socket, dispatch) {
  socket.on('connect', () => {
    console.log('connected to chippie');
  });

  socket.on('disconnect', () => {
    console.log('disconneted from chippie');
  });

  socket.on('game-created', (game) => {
    dispatch({ type: GAME_CREATED, game });
  });

  socket.on('game-updated', (game) => {
    dispatch({ type: GAME_UPDATED, game });
  });

  socket.on('action-created', (action) => {
    console.log('Action created!', JSON.stringify(action, null, 2));
  });

  socket.on('pot-request-created', (potRequest) => {
    console.log('Pot request created!', JSON.stringify(potRequest, null, 2));
  });

  socket.on('pot-request-updated', (potRequest) => {
    console.log('Pot request updated!', JSON.stringify(potRequest, null, 2));
  });
}

const Socket = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);

  useEffect(() => {
    if (!authState.authToken.token)
      return;

    console.log('setting up socket..');
    const socketMarkerWorld = setUpMarkerWorld(authState.authToken.token);
    handleEventsMarkerWorld(socketMarkerWorld, dispatch);

    const socketChippie = setUpChippie(authState.authToken.token);
    handleEventsChippie(socketChippie, dispatch);

    return () => {
      console.log('Disconnecting socket.');
      socketMarkerWorld.disconnect();
      socketChippie.disconnect();
    }
  }, [authState.authToken, dispatch]);

  return null;
};

export default Socket;