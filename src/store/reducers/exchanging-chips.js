import { createReducer } from "@reduxjs/toolkit";
import { exchangeChips } from "../actions/exchanging-chips-action.js";
import statusConstants from "../constants/status-constants.js";

const { error, loading, fulfilled } = statusConstants;
export const exchangingChips = createReducer({}, (builder) => {
    builder
        .addCase(exchangeChips.fulfilled, () => ({
            status: fulfilled
        }))
        .addCase(exchangeChips.pending, () => ({
            status: loading
        }))
        .addCase(exchangeChips.rejected, (_, action) => ({
            status: error,
            error: action.error.message
        }));
});
