import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {packsApi} from "../../app/api";



const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1, // выбранная страница
    pageCount: 10,
    userId: "",
    packName: ""
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
        setMinCardsCount(state, action: PayloadAction<{ minCardsCount: number }>) {
            return {...state, minCardsCount: action.payload.minCardsCount}
        },
        setMaxCardsCount(state, action: PayloadAction<{ maxCardsCount: number }>) {
            return {...state, maxCardsCount: action.payload.maxCardsCount}
        },
        setCardPacksTotalCount(state, action: PayloadAction<{ cardPacksTotalCount: number }>) {
            return {...state, cardPacksTotalCount: action.payload.cardPacksTotalCount}
        },
        setCurrentPage(state, action: PayloadAction<{ page: number }>) {
            return {...state, page: action.payload.page}
        },
        setPageCount(state, action: PayloadAction<{ pageCount: number }>) {
            return {...state, pageCount: action.payload.pageCount}
        },
        getUserId(state, action: PayloadAction<{ userId: string }>) {
            return {...state, userId: action.payload.userId}
        },
        setPackName(state, action: PayloadAction<{ packName: string }>) {
            return {...state, packName: action.payload.packName}
        },
    }
})

export const packsReducer = slice.reducer

export const {
    getPacksData,
    setMinCardsCount,
    setMaxCardsCount,
    setCardPacksTotalCount,
    setCurrentPage,
    setPageCount,
    getUserId,
    setPackName
} = slice.actions


// Thunks

export const fetchPacksTC = () => (dispatch: Dispatch) => {
    packsApi.getPacks()
        .then(response => dispatch(getPacksData({data: response.data})))
        .catch((error) => console.log(error))
}
export const fetchMyPacksTC = (userId:string) => (dispatch: Dispatch) => {
    if(userId !== "") {
        packsApi.getMyPacks(userId)
            .then(response => dispatch(getPacksData({data: response.data})))
            .catch((error) => console.log(error))
    }
}

export const searchPackTC = (packName: string) => (dispatch: Dispatch) => {

    if (packName !== "" && packName !== undefined) {
        debugger
        packsApi.searchPack(packName)
            .then(response => dispatch(getPacksData({data: response.data})))
            .catch((error) => console.log(error))
    }
}

export const rangePacksTC = (minCount: number, maxCount: number) => (dispatch: Dispatch) => {
    packsApi.rangePacks(minCount, maxCount)
        .then(response => {
                dispatch(getPacksData({data: response.data}))
                dispatch(setMaxCardsCount({maxCardsCount: maxCount}))
                dispatch(setMinCardsCount({minCardsCount: minCount}))
            }
        )
        .catch((error) => console.log(error))
}

