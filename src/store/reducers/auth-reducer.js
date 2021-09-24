import { createReducer } from "@reduxjs/toolkit";
import { PLAYER_LEFT_TABLE } from "./table-reducer";

export const CREATE_AUTH_TOKEN = "CREATE_AUTH_TOKEN";
export const CREATE_REFRESH_TOKEN = "CREATE_REFRESH_TOKEN";

export const auth = createReducer({}, (builder) => {
    builder
        .addCase(CREATE_AUTH_TOKEN, (state, action) => {
            return { ...state, authToken: action.authToken };
        })
        .addCase(CREATE_REFRESH_TOKEN, (state, action) => {
            return { ...state, authToken: action.refreshToken };
        })
        .addCase(PLAYER_LEFT_TABLE, (state, action) => {
            return { authToken: {}, refreshToken: {} };
        });
});
