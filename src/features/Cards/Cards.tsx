import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import classes from './Cards.module.css'
import {CardListTable} from "./CardListTable/CardListTable";
import TextField from "@mui/material/TextField";

import {useEffect, useState} from "react";
import {useDebounce} from "usehooks-ts";
import {AppStateType} from "../../app/store";
import {addNewPackTC, redirectToCards, setIsModalActive, setNewPackName} from "../Packs/packs-reducer";
import {Navigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {setIsCardsModalActive, setNewCardName} from "./cards-reducer";
import {BasicModal} from "../Modal/Modal";


export const Cards = () => {
    const cardPacks = useSelector((state: AppStateType) => state.cards.cardPacks)
    const cardsTotalCount = useSelector((state: AppStateType) => state.cards.cardsTotalCount)
    const cardMaxGrade = useSelector((state: AppStateType) => state.cards.maxGrade)
    const isRedirect = useSelector((state: AppStateType) => state.packs.isRedirect)
    const isCardsModalActive = useSelector((state: AppStateType) => state.cards.isCardsModalActive)

    const dispatch = useDispatch()

    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 1000)

    const ohChangeInputHandler = (e: any) => {
        setValue(e.currentTarget.value)
    }

    if (!isRedirect) {
        return <Navigate to="/"/>
    }

    const backBtnHandler = () => {
        dispatch(redirectToCards({isRedirect: false}))
    }
    const onClickAddCardHandler = () => {
        console.log("I'm Cool Card")
        // @ts-ignore
        dispatch(addNewCardTC(newCardName, inputPrivateValue))
        dispatch(setNewCardName({newCardName: ""}))
        dispatch(setIsCardsModalActive({isCardsModalActive: false}))
    }

    const addNewCardButtonHandler = () => {
        isCardsModalActive ? dispatch(setIsCardsModalActive({isCardsModalActive: false})) : dispatch(setIsCardsModalActive({isCardsModalActive: true}))
    }

    if (isCardsModalActive) {
        return <BasicModal style={{"position": "absolute"}} onClickBtnHandler={() => onClickAddCardHandler()}
                           name={"Add New Card"} btnName={"Add Card"} placeholderName={"Enter name of Card"}
                           open={true}/>
    } else {
        return (
            <div className={classes.packsWrp}>
                <button onClick={backBtnHandler}>Back</button>
                <div className={classes.packsList}>
                    <div className={classes.packsListAdd}>
                        <TextField onChange={e => ohChangeInputHandler(e)} size={"small"}
                                   className={classes.searchInput} id="outlined-basic" label="Search"
                                   variant="outlined"/>
                        <Button className={classes.addNewPackBtn} onClick={addNewCardButtonHandler} variant="contained">Add
                            new
                            Card</Button>
                    </div>
                    <CardListTable cardPacks={cardPacks} cardsTotalCount={cardsTotalCount} cardMaxGrade={cardMaxGrade}/>
                </div>
            </div>
        )
    }
}
