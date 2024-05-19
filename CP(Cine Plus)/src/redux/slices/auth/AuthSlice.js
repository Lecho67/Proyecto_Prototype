import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: "auth",   
    initialState: {
        status: false,
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    },
    reducers: {
        register: (state, action) => { 
            state.email = action.payload.email;
            state.status = true;    
        },

        logout: (state, action) => {
            state.status = false;
            state.email = null;
            state.uid = null;
        },

        login: (state, action) => {
            state.status = true;
            state.email = action.payload.email
        },

        checkingCredentials: (state, action) => {
            state.status = action.payload.status;
            state.email = action.payload.email
        }


}
})

export const { register, logout, checkingCredentials,login } = AuthSlice.actions