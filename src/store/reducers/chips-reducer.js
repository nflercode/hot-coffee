import { createReducer } from "@reduxjs/toolkit";

export const CHIPS_FETCHED = "CHIPS_FETCHED";

export const chips = createReducer([], (builder) => {
    builder.addCase(CHIPS_FETCHED, (state, action) => {
        return action.chips;
    });
});
