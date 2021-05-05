import { io } from 'socket.io-client'

let socket;

function setUp(authToken) {
  socket = io(process.env.REACT_APP_API_HOST, {
    auth: {
      token: authToken
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
}

export { setUp, socket }