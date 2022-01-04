import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_CHIPPIE_HOST } = process.env;

export const fetchPotRequest = createAsyncThunk(
    "potRequest/fetchPotRequest",
    async ({ gameId, authToken }) => {
        const response = await axios.get(
            `${REACT_APP_CHIPPIE_HOST}/game/${gameId}/pot-requests/ongoing`,
            {
                headers: {
                    Authorization: `bearer ${authToken}`
                }
            }
        );
        return response.data.potRequest;
    }
);
