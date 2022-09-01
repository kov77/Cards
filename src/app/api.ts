import axios from "axios";
import {restoreDataType} from "../features/Recovery/recovery-reducer";

export type registerDataType = {
    email: string
    password: string
}
export type loginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type userDataType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number; // количество колод

    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean

    error?: string
}

export type changeUserNameDataType = {
    name: string
}

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const authorizationApi = {
    setRegistrationData(data: registerDataType) {
        return instance.post('/auth/register', data)
    },
    setLoginData(data: loginDataType) {
        return instance.post('/auth/login', data)
    },
    logout() {
        return instance.delete('/auth/me')
    }
}

export const userApi = {
    getUserData() {
        return instance.post('/auth/me')
    },
    changeUserName(data: changeUserNameDataType) {
        return instance.put('/auth/me', data)
    }
}

export const restoreApi = {
    sendRestoreData(data: restoreDataType) {
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', data)
    },
    sentNewPassData(data: any) {
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/set-new-password', data)
    }
}

export const packsApi = {
    getPack(min?: number, max?: number, pageCount?: number, sortPacks?: number, page?: number, user_id?: string) {
        return instance.get(`https://neko-back.herokuapp.com/2.0/cards/pack?min=${min}&max=${max}&pageCount=${pageCount}`)
        // return instance.get(`/cards/pack?min=${min}&max=${max}&pageCount=${pageCount}`)
    }
}
