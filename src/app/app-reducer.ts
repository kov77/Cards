import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import { setIsLoggedIn } from "../features/Login/login-reducer";
import { userApi } from "./api";

export type RequestStatusType = "loading" | "success" | "failed"

const initialState = {
    status: "",
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        getUserId(state, action: PayloadAction<{ userId: string }>) {
            return {...state, userId: action.payload.userId}
        },
    }
})

export  const appReducer = slice.reducer

export const {setStatus, getUserId} = slice.actions


// Thunks

export const initializeAppTC = () => (dispatch: Dispatch) => {
    userApi.getUserData()
        .then(response => {
            dispatch(getUserId({userId: response.data._id}))
            dispatch(setIsLoggedIn({isLoggedIn: true}))
        })
        .catch((error) => {
            dispatch(setIsLoggedIn({isLoggedIn: false}))
        })
}

