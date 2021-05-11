export const CREATE_TABLE = "CREATE_TABLE";
export const PLAYER_JOINED = "PLAYER_JOINED";
export const TABLE_NAME_CHANGE = "TABLE_NAME_CHANGE";
export const PLAYER_LEFT_TABLE = "PLAYER_LEFT_TABLE";

export const table = (state = 0, action) => {
    switch(action.type) {
        case CREATE_TABLE:
            return {
                ...state,
                ...action.table
            };
        case PLAYER_JOINED: {
            return {
                ...state, 
                players: [...state.players,action.player]
            }
        }
        case TABLE_NAME_CHANGE: {
            return {
                ...state,
                name: action.name
            }
        }
        case PLAYER_LEFT_TABLE: {
            return {};
        }
        default: 
            return state;
    }
};