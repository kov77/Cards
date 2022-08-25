import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers, createStore } from "redux";
import { errorReducer } from "../features/Error/error-reducer";
import { loginReducer } from "../features/Login/login-reducer";
import { newPassReducer } from "../features/NewPassword/newpass-reducer";
import { profileReducer } from "../features/Profile/profile-reducer";
import { recoveryReducer } from "../features/Recovery/recovery-reducer";
import thunk from 'redux-thunk';
import { registrationReducer } from "../features/Registration/registration-reducer";
import { appReducer } from "./app-reducer";
import { packsReducer } from "../features/Packs/packs-reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    error: errorReducer,
    login: loginReducer,
    newPass: newPassReducer,
    recovery: recoveryReducer,
    registration: registrationReducer,
    app: appReducer,
    packs: packsReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<typeof rootReducer>


export type AppStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


export default store

// @ts-ignore
window.store = store
