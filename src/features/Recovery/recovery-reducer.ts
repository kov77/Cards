import {createSlice} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {setStatus} from "../../app/app-reducer";
import {restoreApi} from "../../app/api";

export const recoveryReducer = (state: any, action: any) => {
    return null
}

const initialState = {
}

const slice = createSlice({
    name: "recovery",
    initialState,
    reducers: {

    }
})

//Thunks

export const restorePasswordTC = (data: any) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: "loading"}))
    restoreApi.sendRestoreData(data)
        .then(response => {
            dispatch(setStatus({status: "success"}))
            console.log(response)
            }
        )
        .catch(error => {
            console.log(error)
            dispatch(setStatus({status: "failed"}))
        })
}
