export const POT_REQUEST_FETCHED = "POT_REQUEST_FETCHED";

export const potRequest = (state = {}, action) => {
    switch (action.type) {
        case POT_REQUEST_FETCHED:
            return action.potRequest;
        default:
            return state;
    }
};
