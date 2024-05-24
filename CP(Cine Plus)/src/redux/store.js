import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./slices/auth/AuthSlice";
import seatReducer from "./slices/auth/seatSlices.js";
export const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        seats: seatReducer,
    }
})