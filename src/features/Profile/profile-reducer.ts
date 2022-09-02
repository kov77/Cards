import { createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios";
import { Dispatch } from "redux"
import {authorizationApi, changeUserNameDataType, userApi} from "../../app/api";
import { setIsLoggedIn } from "../Login/login-reducer";
import {setStatus} from "../../app/app-reducer";

const initialState = {
    name: 'Unknown',
    email: '',
    password: "",
    avatar: '',
    publicCardPacksCount: 0,
    isChecked: false
}


const slice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload.email
        },
        setPublicCardPacksCount: (state, action) => {
            state.publicCardPacksCount = action.payload.publicCardPacksCount
        },
        setIsChecked: (state, action) => {
            state.isChecked = action.payload.isChecked
        },
        setName: (state, action) => {
            state.name = action.payload.name
        }
    }
})

export const {setEmail, setPublicCardPacksCount, setIsChecked, setName} = slice.actions

export const profileReducer = slice.reducer

//Thunks

export const fetchUserTC = () => (dispatch: Dispatch) => {
    dispatch(setStatus({status: "loading"}))
    userApi.getUserData()
        .then(response => {
            const email = response.data.email
            const name = response.data.name
            const publicCardPacksCount = response.data.publicCardPacksCount
            dispatch(setEmail({email}))
            dispatch(setName({name}))
            dispatch(setPublicCardPacksCount({publicCardPacksCount}))
            dispatch(setStatus({status: "success"}))
        })
        .catch((error: AxiosError) => {
        console.log(error)
            dispatch(setStatus({status: "failed"}))

        })

}

export const logoutTC = () => (dispatch: Dispatch) => {
    authorizationApi.logout().then(response => {
        dispatch(setIsLoggedIn({isLoggedIn: false}))
    })
        .catch(error => {
            console.log(error)
        })
}

export const changeNameTC = (name: changeUserNameDataType) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: "loading"}))
    userApi.changeUserName(name)
        .then(response => {
            const name = response.data.updatedUser.name

            dispatch(setIsChecked({isChecked: false}))
            dispatch(setName({name}))
            dispatch(setStatus({status: "success"}))
        })
        .catch(error => {
            dispatch(setIsLoggedIn({isLoggedIn: false}))
            console.log(error)
        })
}
