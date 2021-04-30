const CREATE_BOARD = "CREATE_BOARD";

export const board = (state = 0, action) => {
    switch(action.type) {
        case CREATE_BOARD:
            return {
                ...state,
                 id: action.board.id,
                  players: [...action.board.players]
                };
        default: 
            return state;
    }
};