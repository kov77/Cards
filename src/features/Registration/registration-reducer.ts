import { createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios";
import { Dispatch } from "redux"
import {authorizationApi, registerDataType} from "../../app/api";

const initialState = {
    rememberMe: true,
    email: '',
    password: "",
    isRegistered: false
}

const slice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        setRegistrationData: (state, action) => {
            state.email = action.payload.email
            state.password = action.payload.password
            state.rememberMe = action.payload.rememberMe
        },
        setRegistered: (state, action) => {
            state.isRegistered = action.payload.isRegistered
        }
    }
})

export const {setRegistrationData, setRegistered} = slice.actions

export const registrationReducer = slice.reducer

//Thunks

export const setRegistrationDataTC = (data: registerDataType) => (dispatch: Dispatch) => {
    authorizationApi.setRegistrationData(data)
        .then(response => {
        if(response.statusText === 'Created') {
            dispatch(setRegistered({isRegistered: true}))
        }
    })
        .catch((error: AxiosError) => {
        console.log(error)
    })
}
