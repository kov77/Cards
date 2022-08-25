import Alert from "@mui/material/Alert"
import {Navigate} from "react-router-dom";
import * as React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../app/store";

export const Packs = (props: any) => {
    const isLoggedIn = useSelector((state: AppStateType) => state.login.isLoggedIn)

    if(!isLoggedIn) {
        return <Navigate to="/login"/>
    }
    return (
        <div>Cards</div>
    )
}
