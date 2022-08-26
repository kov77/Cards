import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {setStatus} from "../../app/app-reducer";
import {restoreApi} from "../../app/api";

const initialState = {
    passIsChanged: false
}

const slice = createSlice({
    name: "recovery",
    initialState,
    reducers: {
        setPassIsChangedStatus(state, action: PayloadAction<{passIsChanged: boolean}>) {
            state.passIsChanged = action.payload.passIsChanged
        }
    }
})

export const newPassReducer = slice.reducer
export const {setPassIsChangedStatus} = slice.actions

//Thunks

export const setNewPasswordTC = (data: any) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: "loading"}))
    restoreApi.sentNewPassData(data)
        .then(response => {
            dispatch(setStatus({status: "success"}))
            dispatch(setPassIsChangedStatus({passIsChanged: true}))

        })
        .catch(error => {
            console.log(error)
            dispatch(setStatus({status: "failed"}))
        })
}
