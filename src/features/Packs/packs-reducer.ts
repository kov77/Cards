import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {packsApi} from "../../app/api";
import {getUserId} from "../../app/app-reducer";

const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1, // выбранная страница
    pageCount: 10,
    packName: "",
    switcher: false
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
        setPackName(state, action: PayloadAction<{ packName: string }>) {
            return {...state, packName: action.payload.packName}
        },
        setSwitcher(state, action: PayloadAction<{ switcher: boolean }>) {
            return {...state, switcher: action.payload.switcher}
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
    setPackName,
} = slice.actions


// Thunks

export const fetchPacksTC = () => (dispatch: Dispatch) => {

    packsApi.getPacks()
        .then(response => {
            dispatch(getPacksData({data: response.data}))
            dispatch(setCardPacksTotalCount({cardPacksTotalCount: response.data.cardPacksTotalCount}))
        })
        .catch((error) => console.log(error))
}
export const fetchMyPacksTC = (userId:string) => (dispatch: Dispatch) => {
    if(userId !== "") {
        packsApi.getMyPacks(userId)
            .then(response => dispatch(getPacksData({data: response.data})))
            .catch((error) => console.log(error))
    }
}
export const fetchMyRangedPacksTC = (userId: string, minCount: number, maxCount: number) => (dispatch: Dispatch) => {
    if(userId !== "") {
        packsApi.getMyRangedPacks(userId, minCount, maxCount)
            .then(response => dispatch(getPacksData({data: response.data})))
            .catch((error) => console.log(error))
    }
}

export const rangePacks = (min: number, max: number) => (dispatch: Dispatch) => {
    packsApi.rangePacks(min, max)
        .then(response => {
            dispatch(getPacksData({data: response.data}))
            dispatch(setMaxCardsCount({maxCardsCount: response.data.maxCardsCount}))
            dispatch(setMinCardsCount({minCardsCount: response.data.minCardsCount}))
            dispatch(setCardPacksTotalCount({cardPacksTotalCount: response.data.cardPacksTotalCount}))
        })
}

export const searchPackTC = (packName: string) => (dispatch: Dispatch) => {

    if (packName !== "" && packName !== undefined) {
        debugger
        packsApi.searchPack(packName)
            .then(response => dispatch(getPacksData({data: response.data})))
            .catch((error) => console.log(error))
    }
}


