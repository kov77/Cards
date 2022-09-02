import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {packsApi} from "../../app/api";
import {setIsLoggedIn} from "../Login/login-reducer";

const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 30,
    minCardsCount: 5,
    page: 1, // выбранная страница
    pageCount: 10
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
        getPacksData(state, action: any) {
            return {...state, cardPacks: action.payload.data.cardPacks}
        },
        setMinCardsCount(state, action: PayloadAction<{minCardsCount: number}>) {
            return {...state, minCardsCount: action.payload.minCardsCount}
        },
        setMaxCardsCount(state, action: PayloadAction<{maxCardsCount: number}>) {
            return {...state, maxCardsCount: action.payload.maxCardsCount}
        },
        setCardPacksTotalCount(state, action: PayloadAction<{cardPacksTotalCount: number}>) {
            return {...state, cardPacksTotalCount: action.payload.cardPacksTotalCount}
        },
        setCurrentPage(state, action: PayloadAction<{page: number}>) {
            return {...state, page: action.payload.page}
        },
        setPageCount(state, action: PayloadAction<{pageCount: number}>) {
            return {...state, pageCount: action.payload.pageCount}
        },
    }
})

export  const packsReducer = slice.reducer

export const {getPacksData, setMinCardsCount, setMaxCardsCount, setCardPacksTotalCount, setCurrentPage, setPageCount} = slice.actions


// Thunks

export const fetchPacksTC = (minCount?: number, maxCount?: number, userId?: string) => (dispatch: Dispatch) => {

    packsApi.getPack(minCount, maxCount, initialState.cardPacksTotalCount, 1, initialState.page, userId)
        .then(response => {
            const data = response.data
            dispatch(getPacksData({data}))
        })
        .catch((error) => {
            console.log(error)
        })
}


