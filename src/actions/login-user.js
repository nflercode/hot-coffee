import { loginUser } from '../services/user';

const loginUserInit = () => ({
    type: 'LOGIN_USER_INIT'
});

const loginUserSuccess = (user) => ({
    type: 'LOGIN_USER_SUCCESS',
    user
});

const loginUserFailure = () => ({
    type: 'LOGIN_USER_FAILURE'
});

export const loginUserAction = (email, password) => async (dispatch) => {
    dispatch(loginUserInit());

    try {
        const user = await loginUser(email, password);

        if (user)
            dispatch(loginUserSuccess(user));
        else
            dispatch(loginUserFailure());
    } catch (err) {
        console.error(err.message);
        dispatch(loginUserFailure());
    }
};