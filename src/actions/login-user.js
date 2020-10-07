import { loginUser } from '../services/user';

const loginUserInit = () => ({
    type: 'LOGIN_USER_INIT'
});

const loginUserSuccess = () => ({
    type: 'LOGIN_USER_SUCCESS'
});

const loginUserFailure = () => ({
    type: 'LOGIN_USER_FAILURE'
});

export const loginUserAction = (username, password) => async (dispatch) => {
    dispatch(loginUserInit());

    try {
        const response = await loginUser(username, password);

        if (response.status === 200)
            dispatch(loginUserSuccess());
        else
            dispatch(loginUserFailure());
    } catch (err) {
        console.error(err.message);
        dispatch(loginUserFailure());
    }
};