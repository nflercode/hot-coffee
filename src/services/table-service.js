import axios from 'axios';

const { REACT_APP_API_HOST } = proces.env;

async function joinTableByInvitationToken(invitationToken) {
  return await axios.post(`${REACT_APP_API_HOST}/poker/tables/${invitationToken}`);
}

async function createTable(name) {
  return await axios.post(`${REACT_APP_API_HOST}/poker/tables`, { name });
}

export default { joinTableByInvitationToken, createTable };