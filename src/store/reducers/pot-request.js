import { createReducer } from "@reduxjs/toolkit";

export const POT_REQUEST_FETCHED = "POT_REQUEST_FETCHED";

export const potRequest = createReducer([], (builder) => {
    builder.addCase(POT_REQUEST_FETCHED, (state, action) => {
        return action.potRequest;
    });
});
