import axios from 'axios';

const apiUrl = 'https://api.nfler.se';
export async function post(endpoint, data) {
    return await axios.post(apiUrl + endpoint, data);
}

export default {
    post
}