import { createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios";
import { Dispatch } from "redux"
import {authorizationApi, registerDataType} from "../../app/api";
import {setStatus} from "../../app/app-reducer";

const initialState = {
    email: '',
    password: "",
    name: "",
    isRegistered: false
}

const slice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        setRegistrationData: (state, action) => {
            state.email = action.payload.email
            state.password = action.payload.password
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
    dispatch(setStatus({status: "loading"}))
    authorizationApi.setRegistrationData(data)
        .then(response => {
            dispatch(setStatus({status: "success"}))
        if(response.statusText === 'Created') {
            dispatch(setRegistered({isRegistered: true}))
        }
        })
        .catch((error: AxiosError) => {
        console.log(error)
    })
}
