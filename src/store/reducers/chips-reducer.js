import { createReducer } from "@reduxjs/toolkit";
import { fetchChips } from "../actions/chips-action";
import statusConstants from "../constants/status-constants.js";
export const CHIPS_FETCHED = "CHIPS_FETCHED";

const { error, loading, fulfilled } = statusConstants;
export const chips = createReducer({}, (builder) => {
    builder
        .addCase(fetchChips.fulfilled, (state, action) => {
            return {
                data: [...action.payload.data.chips],
                status: fulfilled
            };
        })
        .addCase(fetchChips.pending, (state, action) => {
            return { ...state, status: loading };
        })
        .addCase(fetchChips.rejected, (state, action) => {
            return {
                ...state,
                status: error,
                error: action.error.message
            };
        });
});
