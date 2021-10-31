import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_CHIPPIE_HOST } = process.env;

export const exchangeChips = createAsyncThunk(
    "exchangingChips/exchangeChips",
    async ({ authToken, chips }) => {
        const response = await axios.post(
            `${REACT_APP_CHIPPIE_HOST}/game/chips/exchange`,
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
