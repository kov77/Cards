import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {packsApi} from "../../app/api";
import {setStatus} from "../../app/app-reducer";

const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1, // выбранная страница
    pageCount: 10,
    packName: "",
    switcher: false,
    isRedirect: false,
    newPackName: "",
    isModalActive: false,
    isEditModalActive: false,
    isPackChanged: false,
    isPackPrivate: false,
    packId: ""
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
        redirectToCards(state, action: PayloadAction<{ isRedirect: boolean }>) {
            return {...state, isRedirect: action.payload.isRedirect}
        },
        setNewPackName(state, action: PayloadAction<{ newPackName: string }>) {
            return {...state, newPackName: action.payload.newPackName}
        },
        setIsModalActive(state, action: PayloadAction<{ isModalActive: boolean }>) {
            return {...state, isModalActive: action.payload.isModalActive}
        },
        setIsEditModalActive(state, action: PayloadAction<{ isEditModalActive: boolean }>) {
            return {...state, isEditModalActive: action.payload.isEditModalActive}
        },
        setIsPackChanged(state, action: PayloadAction<{ isPackChanged: boolean }>) {
            return {...state, isPackChanged: action.payload.isPackChanged}
        },
        setIsPackPrivate(state, action: PayloadAction<{ isPackPrivate: boolean }>) {
            return {...state, isPackPrivate: action.payload.isPackPrivate}
        },
        setCardsPackId(state, action: PayloadAction<{ packId: string }>) {
            return {...state, packId: action.payload.packId}
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
    redirectToCards,
    setSwitcher,
    setNewPackName,
    setIsModalActive,
    setIsPackChanged,
    setIsEditModalActive,
    setIsPackPrivate,
    setCardsPackId
} = slice.actions


// Thunks

export const fetchPacksTC = () => (dispatch: Dispatch) => {
    dispatch(setStatus({status: 'loading'}))
    packsApi.getPacks()
        .then(response => {
            dispatch(getPacksData({data: response.data}))
            dispatch(setCardPacksTotalCount({cardPacksTotalCount: response.data.cardPacksTotalCount}))
            dispatch(setStatus({status: 'success'}))
        })
        .catch((error) => {
            dispatch(setStatus({status: 'failed'}))
            console.log(error)
        })}

export const fetchMyPacksTC = (userId:string, pageCount: number, page: number) => (dispatch: Dispatch) => {
    if(userId !== "") {
        dispatch(setStatus({status: 'loading'}))
        packsApi.getMyPacks(userId, pageCount, page)
            .then(response => {
                dispatch(getPacksData({data: response.data}))
                dispatch(setStatus({status: 'success'}))

            })
            .catch((error) => {
                dispatch(setStatus({status: 'failed'}))
                console.log(error)
            })
    }
}
export const fetchMyRangedPacksTC = (userId: string, minCount: number, maxCount: number, pageCount: number, page: number) => (dispatch: Dispatch) => {
    if(userId !== "") {
        dispatch(setStatus({status: 'loading'}))
        packsApi.getMyRangedPacks(userId, minCount, maxCount, pageCount, page)
            .then(response => {
                dispatch(getPacksData({data: response.data}))
                dispatch(setStatus({status: 'success'}))
            })
            .catch((error) => {
                dispatch(setStatus({status: 'failed'}))
                console.log(error)
            })
    }
}

export const rangePacks = (min: number, max: number, pageCount: number, page: number) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: 'loading'}))
    packsApi.rangePacks(min, max, pageCount, page)
        .then(response => {
            dispatch(getPacksData({data: response.data}))
            dispatch(setMaxCardsCount({maxCardsCount: response.data.maxCardsCount}))
            dispatch(setMinCardsCount({minCardsCount: response.data.minCardsCount}))
            dispatch(setCardPacksTotalCount({cardPacksTotalCount: response.data.cardPacksTotalCount}))
            dispatch(setStatus({status: 'success'}))

        })
}

export const searchPackTC = (packName: string, pageCount: number, page: number) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: 'loading'}))
    packsApi.searchPack(packName, pageCount, page)
        .then(response => {
            dispatch(getPacksData({data: response.data}))
            dispatch(setStatus({status: 'success'}))
        })
        .catch((error) => {
            dispatch(setStatus({status: 'failed'}))
            console.log(error)
        })
}

export const searchMyPackTC = (userId: string, packName: string, pageCount: number, page: number) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: 'loading'}))
    packsApi.searchMyPack(userId, packName, pageCount, page)
        .then(response => {
            dispatch(getPacksData({data: response.data}))
            dispatch(setStatus({status: 'success'}))
        })
        .catch((error) => {
            dispatch(setStatus({status: 'failed'}))
            console.log(error)
        })
}
export const searchRangedPackTC = (packName: string,  minCount: number, maxCount: number, pageCount: number, page: number) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: 'loading'}))
    packsApi.searchRangedPack(packName, minCount, maxCount, pageCount, page)
        .then(response => {
            dispatch(getPacksData({data: response.data}))
            dispatch(setStatus({status: 'success'}))
        })
        .catch((error) => {
            dispatch(setStatus({status: 'failed'}))
            console.log(error)
        })
}
export const searchMyRangedPackTC = (userId: string, packName: string,  minCount: number, maxCount: number, pageCount: number, page: number) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: 'loading'}))
    packsApi.searchMyRangedPack(userId, packName, minCount, maxCount, pageCount, page)
        .then(response => {
            dispatch(getPacksData({data: response.data}))
            dispatch(setStatus({status: 'success'}))
        })
        .catch((error) => {
            dispatch(setStatus({status: 'failed'}))
            console.log(error)
        })
}

export const addNewPackTC = (name: string, privatePack: boolean) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: 'loading'}))

    packsApi.addNewPack(name, privatePack)
        .then(response => {
            dispatch(setStatus({status: 'success'}))
        })
        .catch(error => {
            dispatch(setStatus({status: 'failed'}))
            console.log(error)
        })
}

export const deletePackTC = (packId: string) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: 'loading'}))

    packsApi.deletePack(packId)
        .then(response => {
            dispatch(setStatus({status: 'success'}))
            dispatch(setIsPackChanged({isPackChanged: true}))

        })
        .catch(error => {
            dispatch(setStatus({status: 'failed'}))
            console.log(error)
        })

}

export const editPackTC = (packId: string, newName: string) => (dispatch: Dispatch) => {
    dispatch(setStatus({status: 'loading'}))

    packsApi.editPack(packId, newName)
        .then(response => {
            dispatch(setStatus({status: 'success'}))
            dispatch(setIsPackChanged({isPackChanged: true}))
            dispatch(setIsEditModalActive({isEditModalActive: false}))
        })
        .catch(error => {
            dispatch(setStatus({status: 'failed'}))
        })
}


