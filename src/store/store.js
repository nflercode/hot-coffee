import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { table } from "./reducers/table-reducer";
import { auth } from "./reducers/auth-reducer";
import { game } from "./reducers/game-reducer";
import { chips } from "./reducers/chips-reducer";
import { potRequest } from "./reducers/pot-request";
import { gameActions } from "./reducers/game-actions-reducer";
import { exchangingChips } from "./reducers/exchanging-chips";
import refreshTokenStorage from "../storage/refresh-token-storage";

combineReducers({
    table,
    auth,
    game,
    chips,
    potRequest,
    gameActions,
    exchangingChips
});

const initialAuthState = refreshTokenStorage.getRefreshToken();
export const reducer = {
    table,
    auth,
    game,
    chips,
    potRequest,
    gameActions,
    exchangingChips
};

export const store = configureStore({
    reducer: reducer,
    preloadedState: {
        auth: {
            authToken: {},
            refreshToken: initialAuthState || {}
        }
    }
});
