import { createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios";
import { Dispatch } from "redux"
import {authorizationApi, loginDataType, registerDataType} from "../../app/api";

const initialState = {
    email: '',
    password: "",
    rememberMe: true,
    isLoggedIn: false,
}

const slice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLoginData: (state, action) => {
            state.email = action.payload.email
            state.password = action.payload.password
            state.rememberMe = action.payload.rememberMe
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },

    }
})

export const {setLoginData, setIsLoggedIn} = slice.actions

export const loginReducer = slice.reducer

//Thunks

export const setLoginDataTC = (data: loginDataType) => (dispatch: Dispatch) => {
    authorizationApi.setLoginData(data)
        .then(response => {
            console.log(response)
        if(response.statusText === "OK") {
            dispatch(setIsLoggedIn({isLoggedIn: true}))

        }
    })
        .catch((error: AxiosError) => {
        console.log(error)
    })
}
