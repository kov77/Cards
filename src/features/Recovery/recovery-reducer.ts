import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {setStatus} from "../../app/app-reducer";
import {restoreApi} from "../../app/api";

export type restoreDataType = {
    email: string
    from: string
    message: string
}

const initialState = {
    recoveryRequestStatus: "",
    recoveryEmail: ''
}

const slice = createSlice({
    name: "recovery",
    initialState,
    reducers: {
        setRecoveryStatus(state, action: PayloadAction<{recoveryRequestStatus: string}>) {
            state.recoveryRequestStatus = action.payload.recoveryRequestStatus
        },
        setRecoveryEmail(state, action: PayloadAction<{recoveryEmail: string}>) {
            state.recoveryEmail = action.payload.recoveryEmail
        },
    }
})
export const {setRecoveryStatus, setRecoveryEmail} = slice.actions
export const recoveryReducer = slice.reducer

//Thunks
export const restorePasswordTC = (data: restoreDataType) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: "loading"}))
    dispatch(setRecoveryEmail({recoveryEmail: data.email}))
    restoreApi.sendRestoreData(data)
        .then(response => {
            dispatch(setRecoveryStatus({recoveryRequestStatus: response.data.success}))
            dispatch(setStatus({status: "success"}))
            }
        )
        .catch(error => {
            console.log(error)
            dispatch(setStatus({status: "failed"}))
        })
}
