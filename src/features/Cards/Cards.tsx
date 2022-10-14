import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import classes from './Cards.module.css'
import {CardListTable} from "./CardListTable/CardListTable";
import TextField from "@mui/material/TextField";

import {useEffect, useState } from "react";
import {useDebounce} from "usehooks-ts";
import {AppStateType} from "../../app/store";
import {redirectToCards} from "../Packs/packs-reducer";
import {Navigate} from "react-router-dom";


export const Cards = () => {
    const cardPacks = useSelector((state: AppStateType) => state.cards.cardPacks)
    const cardsTotalCount = useSelector((state: AppStateType) => state.cards.cardsTotalCount)
    const cardMaxGrade = useSelector((state: AppStateType) => state.cards.maxGrade)
    const isRedirect = useSelector((state: AppStateType) => state.packs.isRedirect)

    const dispatch = useDispatch()

    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 1000)

    const ohChangeInputHandler = (e: any) => {
        setValue(e.currentTarget.value)
    }

    if(!isRedirect) {
        return <Navigate to="/"/>
    }

    const backBtnHandler = () => {
        dispatch(redirectToCards({isRedirect: false}))
    }

    return (
        <div className={classes.packsWrp}>
            <button onClick={backBtnHandler}>Back</button>
            <div className={classes.packsList}>
                <div className={classes.packsListAdd}>
                    <TextField onChange={e => ohChangeInputHandler(e)} size={"small"} className={classes.searchInput} id="outlined-basic" label="Search"
                               variant="outlined"/>
                </div>
                <CardListTable cardPacks={cardPacks} cardsTotalCount={cardsTotalCount} cardMaxGrade={cardMaxGrade}/>
            </div>
        </div>
    )
}
