import axios from 'axios';

const { REACT_APP_CHIPPIE_HOST } = process.env;

async function createGame(authToken) {
  return await axios.post(`${REACT_APP_CHIPPIE_HOST}/game`, {}, {
      headers: {
        Authorization: `bearer ${authToken}`
      }
    }, (data) => {
      console.log(data);
    });
}

async function getGameOngoing(authToken) {
  return await axios.get(`${REACT_APP_CHIPPIE_HOST}/game/ongoing`, {
    headers: {
      Authorization: `bearer ${authToken}`
    }
  });
}

async function raise(authToken, gameId, chips) {
  return await axios.post(`${REACT_APP_CHIPPIE_HOST}/game/raise`,
  {
    gameId,
    chips
  }, {
    headers: {
      Authorization: `bearer ${authToken}`
    }
  }, (data) => {
    console.log(data);
  })
}

async function check(authToken, gameId) {
  return await axios.post(`${REACT_APP_CHIPPIE_HOST}/game/${gameId}/check`,
  {},
  {
    headers: {
      Authorization: `bearer ${authToken}`
    }
  }, (data) => {
    console.log(data);
  })
}

async function createPotRequest(authToken, gameId) {
  return await axios.post(`${REACT_APP_CHIPPIE_HOST}/game/${gameId}/pot/request`,
  {},
  {
    headers: {
      Authorization: `bearer ${authToken}`
    }
  }, (data) => {
    console.log(data);
  })
}

async function updatePotRequest(authToken, potRequestId, answer) {
  return await axios.put(`${REACT_APP_CHIPPIE_HOST}/game/pot/request/${potRequestId}`,
  {
    answer
  }, {
    headers: {
      Authorization: `bearer ${authToken}`
    }
  }, (data) => {
    console.log(data);
  })
}

async function getAwaitingPotRequest(authToken, gameId) {
  return await axios.get(`${REACT_APP_CHIPPIE_HOST}/game/${gameId}/pot/request`,
  {
    headers: {
      Authorization: `bearer ${authToken}`
    }
  }, (data) => {
    console.log(data);
  })
}

const gameService = {
  createGame,
  getGameOngoing,
  raise,
  check,
  createPotRequest,
  updatePotRequest,
  getAwaitingPotRequest
}

export default gameService;