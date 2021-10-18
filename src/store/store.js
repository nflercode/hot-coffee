import { combineReducers, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { table } from "./reducers/table-reducer";
import { auth } from "./reducers/auth-reducer";
import { game } from "./reducers/game-reducer";
import { chips } from "./reducers/chips-reducer";
import { potRequest } from "./reducers/pot-request";
import { gameActions } from "./reducers/game-actions-reducer";
import refreshTokenStorage from "../storage/refresh-token-storage";

combineReducers({
    table,
    auth,
    game,
    chips,
    potRequest,
    gameActions
});

const initialAuthState = refreshTokenStorage.getRefreshToken();

export const store = configureStore({
    reducer: {
        table,
        auth,
        game,
        chips,
        potRequest,
        gameActions
    },
    preloadedState: {
        auth: {
            authToken: {},
            refreshToken: initialAuthState || {}
        }
    }
});
