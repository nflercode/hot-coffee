import { createStore } from 'redux';
import { table } from "./reducers/table-reducer";

export const store = createStore(
    table,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);