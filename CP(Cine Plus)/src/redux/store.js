import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./slices/auth/AuthSlice";
export const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer
    }
})