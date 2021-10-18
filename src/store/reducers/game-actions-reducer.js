import { createReducer, createAction } from "@reduxjs/toolkit";
import { fetchGameActions } from "../actions/game-actions-actions";
import statusConstants from "../constants/status-constants.js";

export const gameActionCreated = createAction("gameActions/gameActionCreated");

const { error, loading, fulfilled } = statusConstants;
export const gameActions = createReducer({}, (builder) => {
    builder
        .addCase(gameActionCreated, (state, action) => {
            return { ...state, data: [...state.data, action.payload] };
        })
        .addCase(fetchGameActions.pending, (state, _) => {
            return { ...state, status: loading };
        })
        .addCase(fetchGameActions.fulfilled, (_, action) => {
            return {
                data: action.payload.actions,
                status: fulfilled
            };
        })
        .addCase(fetchGameActions.rejected, (state, action) => {
            return {
                ...state,
                status: error,
                error: action.error.message
            };
        });
});
