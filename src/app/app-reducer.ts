import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = "loading" | "success" | "failed"

const initialState = {
    status: ""
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        }
    }
})

export  const appReducer = slice.reducer

export const {setStatus} = slice.actions


// Thunks

// export const initializeAppTC = () => (dispatch: Dispatch) => {
//     userApi.getUserData()
//         .then(response => {
//             dispatch(setIsLoggedIn({isLoggedIn: true}))
//         })
//         .catch((error) => {
//             console.log("Not authorized")
//         })
// }

