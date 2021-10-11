import { combineReducers, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { table } from "./reducers/table-reducer";
import { auth } from "./reducers/auth-reducer";
import { game } from "./reducers/game-reducer";
import { chips } from "./reducers/chips-reducer";
import { potRequest } from "./reducers/pot-request";
import { actions } from "./reducers/actions-reducer";
import refreshTokenStorage from "../storage/refresh-token-storage";

const reducers = combineReducers({
    table,
    auth,
    game,
    chips,
    potRequest,
    actions
});

const initialAuthState = refreshTokenStorage.getRefreshToken();

export const store = configureStore({
    reducer: {
        table,
        auth,
        game,
        chips,
        potRequest,
        actions
    },
    preloadedState: {
        // TODO: maybe this part is unnecessary.. I dunno
        table: {},
        auth: {
            authToken: {},
            refreshToken: initialAuthState || {}
        },
        game: {}
    }
});
