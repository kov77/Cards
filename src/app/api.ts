import axios from "axios";

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

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
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
    },
    getUserData() {
        return instance.post('/auth/me')
    },
}
