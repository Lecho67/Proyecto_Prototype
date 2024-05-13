import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: "auth",   
    initialState: {
        status: 'checking',
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    },
    reducers: {
        register: (state, action) => { 
            state.email = action.payload.email,
            state.status = 'authenticated'     
        },

        logout: (state, action) => {
            state.status = 'not-authenticated',
            state.email = null,
            state.uid = null
        },

        checkingCredentials: (state, action) => {
            console.log('checking credentials')
        }
}
})

export const { register, logout, checkingCredentials } = AuthSlice.actions