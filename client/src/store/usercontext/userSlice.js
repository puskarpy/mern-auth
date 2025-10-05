import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    token : null,
    loading : false,
    error : false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        loginStart : (state) => {
            state.loading = true
        },
        loginSuccess : (state, action) => {
            state.user = action.payload,
            state.loading = false,
            state.error = false
        },
        loginFailed : (state, action) => {
            state.loading = false,
            state.error = action.payload
        },
        logout : ( state ) => {
            state.user = null
        }
    }
})

export const {loginStart, loginFailed, loginSuccess, logout} = userSlice.actions

export default userSlice.reducer