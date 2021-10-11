import { createReducer } from "@reduxjs/toolkit";

export const ACTION_CREATED = "ACTION_CREATED";
export const ACTION_FETCHED = "ACTION_FETCHED";

export const actions = createReducer([], (builder) => {
    builder
        .addCase(ACTION_CREATED, (state, action) => {
            return [...state, action.action];
        })
        .addCase(ACTION_FETCHED, (state, action) => {
            return action.actions;
        });
});
