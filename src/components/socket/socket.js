import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client'

function setUp(authToken) {
  const socket = io(process.env.REACT_APP_API_HOST, {
    auth: {
      token: authToken
    }
  });

  return socket;
}

function handleEvents(socket, dispatch) {
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
}

const Socket = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);

  useEffect(() => {
    if (!authState.authToken.token)
      return;

    console.log('setting up socket..');
    const socket = setUp(authState.authToken.token);
    handleEvents(socket, dispatch);

    return () => {
      console.log('Disconnecting socket.');
      socket.disconnect();
    }
  }, [authState, dispatch]);

  return null;
};

export default Socket;