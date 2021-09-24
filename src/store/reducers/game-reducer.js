import { createReducer } from "@reduxjs/toolkit";

export const GAME_CREATED = "GAME_CREATED";
export const GAME_UPDATED = "GAME_UPDATED";

export const game = createReducer({}, (builder) => {
    builder
        .addCase(GAME_CREATED, (state, action) => {
            return { ...state, ...action.game };
        })
        .addCase(GAME_UPDATED, (state, action) => {
            return { ...state, ...action.game };
        });
});
