export const ACTION_CREATED = "ACTION_CREATED";
export const ACTION_FETCHED = "ACTION_FETCHED";

export const actions = (state = [], action) => {
    switch (action.type) {
        case ACTION_CREATED:
            return [...state, action.action];
        case ACTION_FETCHED:
            return [...state, ...action.actions];
        default:
            return state;
    }
};
