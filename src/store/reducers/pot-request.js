import { createAction, createReducer, isAnyOf } from "@reduxjs/toolkit";
import { fetchPotRequest } from "../actions/pot-request-action";
import statusConstants from "../constants/status-constants";

export const potRequestCreated = createAction("potRequest/potRequestCreated");
export const potRequestUpdated = createAction("potRequest/potRequestUpdated");

const { error, loading, fulfilled } = statusConstants;
export const potRequest = createReducer([], (builder) => {
    builder.addCase(fetchPotRequest.pending, (state, _) => {
        return { ...state, status: loading };
    });
    builder.addCase(fetchPotRequest.fulfilled, (_, action) => {
        return { data: action.payload, status: fulfilled };
    });
    builder.addCase(fetchPotRequest.rejected, (state, action) => {
        return { ...state, error: action.error.message, status: error };
    });
    builder.addMatcher(
        isAnyOf(potRequestCreated, potRequestUpdated),
        (_, action) => {
            return { data: action.payload };
        }
    );
});
