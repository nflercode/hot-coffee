import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_CHIPPIE_HOST } = process.env;

export const fetchChips = createAsyncThunk(
    "chips/fetchChips",
    async (authToken) => {
        return await axios.get(`${REACT_APP_CHIPPIE_HOST}/chips`, {
            headers: {
                Authorization: `bearer ${authToken}`
            }
        });
    }
);
