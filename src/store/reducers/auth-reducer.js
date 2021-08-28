import { PLAYER_LEFT_TABLE } from "./table-reducer";

export const CREATE_AUTH_TOKEN = "CREATE_AUTH_TOKEN";
export const CREATE_REFRESH_TOKEN = "CREATE_REFRESH_TOKEN";

export const auth = (state = {}, action) => {
    switch (action.type) {
        case CREATE_AUTH_TOKEN: {
            return {
                ...state,
                authToken: action.authToken,
            };
        }
        case CREATE_REFRESH_TOKEN: {
            return {
                ...state,
                refreshToken: action.refreshToken,
            };
        }
        case PLAYER_LEFT_TABLE: {
            return {
                authToken: {},
                refreshToken: {},
            };
        }
        default:
            return state;
    }
};
