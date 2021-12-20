import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_CHIPPIE_HOST } = process.env;

export const buyIn = createAsyncThunk(
    "betActions/buy-in",
    async ({ authToken, chips }) => {
        const response = await axios.post(
            `${REACT_APP_CHIPPIE_HOST}/game/buy-in`,
            { chips },
            {
                headers: {
                    Authorization: `bearer ${authToken}`
                }
            }
        );
        return response.data;
    }
);
