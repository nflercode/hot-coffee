import axios from 'axios'

const { REACT_APP_API_HOST } = process.env;

async function deletePlayer(authToken) {
  return await axios.delete(`${REACT_APP_API_HOST}/poker/players`, {
    headers: {
      Authorization: `bearer ${authToken}`
    }
  });
}

const playerService = {
  deletePlayer
};

export default playerService;