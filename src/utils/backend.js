const apiUrl = 'https://api.nfler.se';

export async function post(endpoint, data, headers = {}) {
    const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    });

    return response.json();
}

export default {
    post
}