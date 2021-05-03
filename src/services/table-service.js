import axios from 'axios';

const { REACT_APP_API_HOST } = process.env;

async function joinTable(invitationToken) {
  return await axios.post(`${REACT_APP_API_HOST}/poker/tables/${invitationToken}`);
}

async function createTable(name) {
  return await axios.post(`${REACT_APP_API_HOST}/poker/tables`, { name });
}

export default { joinTable, createTable };