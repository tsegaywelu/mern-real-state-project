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
        },

        updateuserstart: (state) => {
            state.loading = true

        },
        updateusersuccess: (state, action) => {
            state.loading = false
            state.currentuser = action.payload
            state.error = null
        },
        updateuserfailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        }

    }
})

export const { signinStart, signinSuccess, signinFailure, logoutm,  
     updateuserstart, updateusersuccess, updateuserfailure } = userSlice.actions
export default userSlice.reducer