const apiUrl = 'https://api.nfler.se';

export async function post(endpoint, data) {
    return await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

export default {
    post
}