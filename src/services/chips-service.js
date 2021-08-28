import axios from "axios";

const { REACT_APP_CHIPPIE_HOST } = process.env;

async function getChips(authToken) {
    return await axios.get(`${REACT_APP_CHIPPIE_HOST}/chips`, {
        headers: {
            Authorization: `bearer ${authToken}`
        }
    });
}

const chipService = {
    getChips
};

export default chipService;
