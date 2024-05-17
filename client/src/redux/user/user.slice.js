import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentuser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true
        },
        signinSuccess: (state, action) => {
            state.loading = false
            state.currentuser = action.payload
            state.error = null
        },
        signinFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout: (state) => {
            state.currentuser = null
        }
    }
})

export const { signinStart, signinSuccess, signinFailure, logout } = userSlice.actions
export default userSlice.reducer