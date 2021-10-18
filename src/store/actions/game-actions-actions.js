import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_CHIPPIE_HOST } = process.env;

export const fetchGameActions = createAsyncThunk(
    "gameActions/fetchGameActions",
    async (arg) => {
        const response = await axios.get(
            `${REACT_APP_CHIPPIE_HOST}/game/${arg.gameId}/actions/${arg.round}`,
            {
                headers: {
                    Authorization: `bearer ${arg.authToken}`
                }
            }
        );
        return response.data;
    }
);
