import { combineReducers, createStore } from 'redux';
import { table } from "./reducers/table-reducer";
import { auth } from './reducers/auth-reducer';
import { game } from './reducers/game-reducer';
import { chips } from './reducers/chips-reducer';
import refreshTokenStorage from '../storage/refresh-token-storage';

const reducers = combineReducers({ table, auth, game, chips });
const initialAuthState = refreshTokenStorage.getRefreshToken();

export const store = createStore(
    reducers,
    {
        table: {},
        auth: {
            authToken: {},
            refreshToken: initialAuthState || {}
        }
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);