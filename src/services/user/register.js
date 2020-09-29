import { post } from "../../utils/backend"

export async function register(email, password) {
    const response = await post('/user/register', {
        username: email,
        password
    });

    return response;
};

export default {
    register
};