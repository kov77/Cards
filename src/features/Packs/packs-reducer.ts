import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {packsApi} from "../../app/api";
import {setIsLoggedIn} from "../Login/login-reducer";

const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 5,
    maxCardsCount: 10,
    minCardsCount: 5,
    page: 1, // выбранная страница
    pageCount: 30
}

type packType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}

type responseDataType = {
    cardPacks: packType[]
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
        // @ts-ignore
        getPacksData(state, action: PayloadAction<{data: responseDataType}>) {
            return {...state, cardPacks: action.payload.data.cardPacks}
        },
        setRequestData(state, action: PayloadAction<{data: responseDataType}>) {
            return {...state, cardPacksTotalCount: action.payload.data.cardPacksTotalCount, pageCount: action.payload.data.pageCount, maxCardsCount: action.payload.data.maxCardsCount, minCardsCount: action.payload.data.maxCardsCount, page: action.payload.data.page
            }
        }
    }
})

export  const packsReducer = slice.reducer

export const {getPacksData, setRequestData} = slice.actions


// Thunks

export const fetchPacksTC = () => (dispatch: Dispatch) => {

    packsApi.getPack(initialState.minCardsCount, initialState.maxCardsCount, initialState.pageCount, 1, initialState.page)
        .then(response => {
            debugger
            const data = response.data
            dispatch(getPacksData({data}))
        })
        .catch((error) => {

            alert(error)
        })
}



