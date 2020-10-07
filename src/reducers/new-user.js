const newUser = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_USER_INIT':
            return {
                ...state,
                success: false,
                loading: true
            };
        case 'CREATE_USER_SUCCESS':
            return {
                ...state,
                success: true,
                loading: false
            }
        case 'CREATE_USER_FAILURE':
            return {
                ...state,
                success: false,
                loading: false
            }
        default:
            return state    
    };
};

export default newUser;