import axios from 'axios';

const { REACT_APP_MARKERWORLD_HOST } = process.env;

async function joinTable(invitationToken, name) {
  return await axios.post(`${REACT_APP_MARKERWORLD_HOST}/poker/tables/${invitationToken}`, { name });
}

async function createTable(name) {
  return await axios.post(`${REACT_APP_MARKERWORLD_HOST}/poker/tables`, { name });
}

async function getTable(authToken) {
  return await axios.get(`${REACT_APP_MARKERWORLD_HOST}/poker/tables`, {
    headers: {
      Authorization: `bearer ${authToken}`
    }
  });
}

async function getTableByInvitationToken(invitationToken) {
  return await axios.get(`${REACT_APP_MARKERWORLD_HOST}/poker/tables/${invitationToken}`);
}

async function setTableName(authToken, name) {
  return await axios.put(`${REACT_APP_MARKERWORLD_HOST}/poker/tables`, { name }, {
    headers: {
      Authorization: `bearer ${authToken}`
    }
  });
}

const tableService = {
  joinTable,
  createTable,
  getTable,
  getTableByInvitationToken,
  setTableName
}

export default tableService;