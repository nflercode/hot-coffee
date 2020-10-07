import { post } from "../backend"

export async function createUser(email, password) {
    return await post('/user/register', {
        username: email,
        password
    });
}

export async function loginUser(email, password) {
    return await post('/user/login', {
        username: email,
        password
    });
}

export default {
    createUser,
    loginUser
}