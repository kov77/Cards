import { combineReducers, createStore } from "redux";
import { errorReducer } from "./error-reducer";
import {profileReducer} from "./profile-reducer";
import {loginReducer} from "./login-reducer";
import {recoveryReducer} from "./recovery-reducer";
import { newPassReducer } from "./newpass-reducer";
import {registrationReducer} from "./registration-reducer";

const reducers = combineReducers({
    profile: profileReducer,
    error: errorReducer,
    login: loginReducer,
    newpass: newPassReducer,
    recovery: recoveryReducer,
    registration: registrationReducer
})

const store = createStore(reducers)

export type AppStateType = ReturnType<typeof reducers>

export default store

// @ts-ignore
window.store = store
