export const CREATE_TABLE = "CREATE_TABLE";
export const PLAYER_JOINED = "PLAYER_JOINED";
export const TABLE_NAME_CHANGE = "TABLE_NAME_CHANGE";
export const PLAYER_LEFT_TABLE = "PLAYER_LEFT_TABLE";
export const PLAYER_REMOVED = "PLAYER_REMOVED";
export const PLAYER_NAME_CHANGE = "PLAYER_NAME_CHANGE";

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
        case PLAYER_NAME_CHANGE: {
            return {
                ...state,
                players: state.players.map((player) => 
                    player.id === action.player.id ? { ...player, name: action.player.name } : player
                )
            }
        }
        case PLAYER_REMOVED: {
            return {
                ...state,
                players: (state.players || []).filter(player => player.id !== action.playerId)
            }
        }
        default: 
            return state;
    }
};