import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {packsApi} from "../../app/api";

const initialState = {
    cardsPacks: {},
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0, // выбранная страница
    pageCount: 0}

type pack = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}

type responseDataType = {
    cardsPacks: pack[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
}



const slice = createSlice({
    name: "packs",
    initialState,
    reducers: {
        getPacksData(state, action: PayloadAction<{data: responseDataType}>) {
            state = action.payload.data
        }
    }
})

export  const packsReducer = slice.reducer

export const {getPacksData} = slice.actions


// Thunks

export const fetchPacksTC = () => (dispatch: Dispatch) => {
    packsApi.getPack()
        .then(response => {
            getPacksData(response.data)
        })
        .catch((error) => {
            console.log("Not authorized packs")
        })
}


