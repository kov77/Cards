import {createSlice} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {cardsAPI} from "../../app/api";
import {redirectToCards} from "../Packs/packs-reducer";
import {setStatus} from "../../app/app-reducer";

const initialState = {
    cardPacks: [],
    cardsTotalCount: 0,
    page: 1, // selected page
    pageCardsCount: 10, // total pages
    packName: "",
    maxGrade: 0,
    minGrade: 0,
    isCardsModalActive: false,
    newQuestion: "",
    newAnswer: ""
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
        },
        setIsCardsModalActive(state, action: any) {
            return {...state, isCardsModalActive: action.payload.isCardsModalActive}
        },
        setNewQuestion(state, action: any) {
            return {...state, newQuestion: action.payload.newQuestion}
        },
        setNewAnswer(state, action: any) {
            return {...state, newAnswer: action.payload.newAnswer}
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
    setIsCardsModalActive,
    setNewQuestion,
    setNewAnswer
} = slice.actions


// Thunks
export const getCardsTC = (id: string, pageCardsCount: number) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: "loading"}))
    cardsAPI.getCards(id, pageCardsCount)
        .then(response => {
            dispatch(getCardsData({cardPacks: response.data.cards}))
            dispatch(getCardsTotalCount({cardsTotalCount: response.data.cardsTotalCount}))
            dispatch(getMaxGrade({maxGrade: response.data.maxGrade}))
            dispatch(getMinGrade({minGrade: response.data.minGrade}))
            dispatch(redirectToCards({isRedirect: true}))
            dispatch(setStatus({status: "success"}))
        })
        .catch((error) => console.log(error))
}

export const postNewCardTC = (packId: string, question: string, answer: string) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: "loading"}))
    cardsAPI.postNewCard(packId, question, answer)
        .then(response => {
            console.log(response)
            dispatch(setStatus({status: "success"}))

        })
        .catch((error) => {
            console.log(error)
            dispatch(setStatus({status: "failed"}))
        })

}
