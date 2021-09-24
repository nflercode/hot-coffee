import { createReducer } from "@reduxjs/toolkit";

export const CREATE_TABLE = "CREATE_TABLE";
export const PLAYER_JOINED = "PLAYER_JOINED";
export const TABLE_NAME_CHANGE = "TABLE_NAME_CHANGE";
export const PLAYER_LEFT_TABLE = "PLAYER_LEFT_TABLE";
export const PLAYER_REMOVED = "PLAYER_REMOVED";
export const PLAYER_NAME_CHANGE = "PLAYER_NAME_CHANGE";

export const table = createReducer([], (builder) => {
    builder
        .addCase(CREATE_TABLE, (state, action) => {
            return {
                ...state,
                ...action.table
            };
        })
        .addCase(PLAYER_JOINED, (state, action) => {
            return {
                ...state,
                players: [...state.players, action.player]
            };
        })
        .addCase(TABLE_NAME_CHANGE, (state, action) => {
            return {
                ...state,
                name: action.name
            };
        })
        .addCase(PLAYER_LEFT_TABLE, (state, action) => {
            return {};
        })
        .addCase(PLAYER_NAME_CHANGE, (state, action) => {
            return {
                ...state,
                players: state.players.map((player) =>
                    player.id === action.player.id
                        ? { ...player, name: action.player.name }
                        : player
                )
            };
        })
        .addCase(PLAYER_REMOVED, (state, action) => {
            return {
                ...state,
                players: (state.players || []).filter(
                    (player) => player.id !== action.playerId
                )
            };
        });
});
