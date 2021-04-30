export const CREATE_TABLE = "CREATE_TABLE";
export const PLAYER_JOINED = "PLAYER_JOINED";
export const table = (state = 0, action) => {
    switch(action.type) {
        case CREATE_TABLE:
            return {
                ...state,
                ...action.table,
                 id: action.table.id,
                  players: [...action.table.players]
                };
        case PLAYER_JOINED: {
            return {
                ...state, 
                players: [...state.players,action.player]
            }
        }
        default: 
            return state;
    }
};