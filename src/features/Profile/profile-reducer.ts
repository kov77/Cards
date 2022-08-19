import { createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios";
import { Dispatch } from "redux"
import {authorizationApi} from "../../app/api";
import { setIsLoggedIn } from "../Login/login-reducer";

const initialState = {
    email: '',
    password: "",
    avatar: '',
    publicCardPacksCount: 0}

const slice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload.email
        },
        setPublicCardPacksCount: (state, action) => {
            state.publicCardPacksCount = action.payload.publicCardPacksCount
        }
    }
})

export const {setEmail, setPublicCardPacksCount} = slice.actions

export const profileReducer = slice.reducer

//Thunks

export const fetchUserTC = () => (dispatch: Dispatch) => {
    authorizationApi.getUserData()
        .then(response => {
            console.log(response)
            const email = response.data.email
            const publicCardPacksCount = response.data.publicCardPacksCount

            dispatch(setEmail({email}))
            dispatch(setPublicCardPacksCount({publicCardPacksCount}))
    })
        .catch((error: AxiosError) => {
        console.log(error)
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    authorizationApi.logout().then(response => {
        dispatch(setIsLoggedIn(false))
    })
        .catch(error => {
            console.log(error)
        })
}
