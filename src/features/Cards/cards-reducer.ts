import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {cardsAPI, packsApi} from "../../app/api";
import {redirectToCards} from "../Packs/packs-reducer";

const initialState = {
    cardPacks: [],
    cardsTotalCount: 0,
    page: 1, // selected page
    pageCardsCount: 10, // total pages
    packName: "",
    maxGrade: 0,
    minGrade: 0
}

 export type cardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: string
    user_id: string
    created: string
    updated: string
    _id: string
}

type responseDataType = {
    cardPacks: cardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number // выбранная страница
    pageCount: number
    packUserId: string
}

const slice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        getCardsData(state, action: any) {
            return {...state, cardPacks: action.payload.cardPacks}
        },
        getCardsTotalCount(state, action: any) {
            return {...state, cardsTotalCount: action.payload.cardsTotalCount}
        },
        getMaxGrade(state, action: any) {
            return {...state, maxGrade: action.payload.maxGrade}
        },
        getMinGrade(state, action: any) {
            return {...state, minGrade: action.payload.minGrade}
        },
        setPageCardsCount(state, action: any) {
            return {...state, pageCardsCount: action.payload.pageCardsCount}
        }
    }
})

export const cardsReducer = slice.reducer

export const {
    getCardsData,
    getCardsTotalCount,
    getMaxGrade,
    getMinGrade,
    setPageCardsCount,
} = slice.actions


// Thunks
export const getCardsTC = (id: string, pageCardsCount: number) => (dispatch: Dispatch) => {
    cardsAPI.getCards(id, pageCardsCount)
        .then(response => {
            dispatch(getCardsData({cardPacks: response.data.cards}))
            dispatch(getCardsTotalCount({cardsTotalCount: response.data.cardsTotalCount}))
            dispatch(getMaxGrade({maxGrade: response.data.maxGrade}))
            dispatch(getMinGrade({minGrade: response.data.minGrade}))
            dispatch(redirectToCards({isRedirect: true}))
        })
        .catch((error) => console.log(error))
}


