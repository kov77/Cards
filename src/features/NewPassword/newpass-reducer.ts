import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    passIsChanged: false
}

const slice = createSlice({
    name: "recovery",
    initialState,
    reducers: {

    }
})

export const newPassReducer = slice.reducer

//Thunks


