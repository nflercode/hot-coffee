function setRefreshToken(refreshToken) {
  const stringified = JSON.stringify(refreshToken);
  localStorage.setItem('refreshToken', stringified);
}

function getRefreshToken() {
  const stringifiedRefreshToken = localStorage.getItem('refreshToken');
  return JSON.parse(stringifiedRefreshToken);
}

function deleteRefreshToken() {
  localStorage.removeItem('refreshToken');
}

export default { setRefreshToken, getRefreshToken, deleteRefreshToken }