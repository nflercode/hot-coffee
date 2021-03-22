import { post } from "../backend"

export async function createUser(email, password) {
    try {
        const response = await post('/users', {
            email,
            password
        });

        return response.data;
    } catch (error) {
        console.error(`Failed to create user, error: ${error}, error from backend: ${error.response.data.error}`);
        return null;
    }
}

export async function loginUser(email, password) {
    try {
        const response = await post('/users/token', {
            email,
            password
        });

        return response.data;
    } catch (error) {
        console.error(`Failed to get token for user, error: ${error}, error from backend: ${error.response.data.error}`);
        return null;
    }
}

export default {
    createUser,
    loginUser
}