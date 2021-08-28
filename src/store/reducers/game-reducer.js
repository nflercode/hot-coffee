export const GAME_CREATED = "GAME_CREATED";
export const GAME_UPDATED = "GAME_UPDATED";

export const game = (state = {}, action) => {
    switch (action.type) {
        case GAME_UPDATED:
        case GAME_CREATED:
            return {
                ...state,
                ...action.game,
            };
        default:
            return state;
    }
};
