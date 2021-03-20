import { createUser } from '../services/user';

const createUserInit = () => ({
    type: 'CREATE_USER_INIT'
});

const createUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS'
});

const createUserFailure = () => ({
    type: 'CREATE_USER_FAILURE'
});

export const createUserAction = (email, password) => async (dispatch) => {
    dispatch(createUserInit());

    try {
        const response = await createUser(email, password);

        if (response)
            dispatch(createUserSuccess());
        else
            dispatch(createUserFailure());
    } catch (err) {
        console.error(err.message);
        dispatch(createUserFailure());
    }
};