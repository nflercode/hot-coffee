import axios from "axios";

const { REACT_APP_MARKERWORLD_HOST } = process.env;

async function refreshToken(refreshToken) {
    return await axios.post(
        `${REACT_APP_MARKERWORLD_HOST}/auth/refresh-token`,
        { refreshToken }
    );
}

const tokenService = {
    refreshToken,
};

export default tokenService;
