import { createStore } from 'redux';
import { board } from "./reducers/board-reducer";

export const store = createStore(board, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);