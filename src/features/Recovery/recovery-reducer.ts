import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {RequestStatusType, setStatus} from "../../app/app-reducer";
import {restoreApi} from "../../app/api";
import { useLocation } from "react-router-dom";


const initialState = {
    token: ''
}

const slice = createSlice({
    name: "recovery",
    initialState,
    reducers: {
        getToken(state, action: PayloadAction<{token: string}>) {
            state.token = action.payload.token
        }
    }
})
export const {getToken} = slice.actions
export const recoveryReducer = slice.reducer

//Thunks

export const restorePasswordTC = (data: any) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: "loading"}))
    restoreApi.sendRestoreData(data)
        .then(response => {
            const location = useLocation()
            const token = location.pathname

            dispatch(setStatus({status: "success"}))
            dispatch(getToken({token}))

            console.log(response)
            console.log(token)
            }
        )
        .catch(error => {
            console.log(error)
            dispatch(setStatus({status: "failed"}))
        })
}
