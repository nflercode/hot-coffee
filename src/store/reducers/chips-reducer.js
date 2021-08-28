export const CHIPS_FETCHED = "CHIPS_FETCHED";

export const chips = (state = [], action) => {
    switch (action.type) {
        case CHIPS_FETCHED:
            return action.chips;
        default:
            return state;
    }
};
