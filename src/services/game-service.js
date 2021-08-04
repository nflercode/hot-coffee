import axios from 'axios';

const { REACT_APP_CHIPPIE_HOST } = process.env;

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
  return await axios.post(`${REACT_APP_CHIPPIE_HOST}/game/check`,
  {
    gameId
  }, {
    headers: {
      Authorization: `bearer ${authToken}`
    }
  }, (data) => {
    console.log(data);
  })
}

const gameService = {
  getGameOngoing,
  raise,
  check
}

export default gameService;