import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import classes from './Cards.module.css'
import {CardListTable} from "./CardListTable/CardListTable";
import TextField from "@mui/material/TextField";

import {useEffect, useState} from "react";
import {useDebounce} from "usehooks-ts";
import {AppStateType} from "../../app/store";
import {redirectToCards} from "../Packs/packs-reducer";
import {Navigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {
    getCardsTC,
    postNewCardTC,
    setIsCardsModalActive,
    setNewAnswer,
    setNewQuestion,
    setSearchText
} from "./cards-reducer";
import {CardModal} from "../Modal/CardModal";
import Box from "@mui/material/Box";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const Cards = () => {
    const cardPacks = useSelector((state: AppStateType) => state.cards.cardPacks)
    const cardsTotalCount = useSelector((state: AppStateType) => state.cards.cardsTotalCount)
    const cardMaxGrade = useSelector((state: AppStateType) => state.cards.maxGrade)
    const isRedirect = useSelector((state: AppStateType) => state.packs.isRedirect)
    const isCardsModalActive = useSelector((state: AppStateType) => state.cards.isCardsModalActive)
    const packId = useSelector((state: AppStateType) => state.packs.packId)
    const newQuestion = useSelector((state: AppStateType) => state.cards.newQuestion)
    const newAnswer = useSelector((state: AppStateType) => state.cards.newAnswer)
    const pageCardsCount = useSelector((state: AppStateType) => state.cards.pageCardsCount)


    const dispatch = useDispatch()

    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 1000)

    const ohChangeInputHandler = (e: any) => {
        setValue(e.currentTarget.value)
    }

    useEffect(() => {
        dispatch(setSearchText({packName: value}))
    }, [debouncedValue])

    if (!isRedirect) {
        return <Navigate to="/"/>
    }

    const backBtnHandler = () => {
        dispatch(redirectToCards({isRedirect: false}))
    }
    const onClickAddCardHandler = () => {
        // @ts-ignore
        dispatch(postNewCardTC(packId, newQuestion, newAnswer))
        dispatch(setNewQuestion({newQuestion: ""}))
        dispatch(setNewAnswer({newAnswer: ""}))
        dispatch(setIsCardsModalActive({isCardsModalActive: false}))
        // @ts-ignore
        dispatch(getCardsTC(packId, pageCardsCount))

    }

    const addNewCardButtonHandler = () => {
        isCardsModalActive ? dispatch(setIsCardsModalActive({isCardsModalActive: false})) : dispatch(setIsCardsModalActive({isCardsModalActive: true}))
    }

    if (isCardsModalActive) {
        return <CardModal className={classes.addNewCardModal} style={{"position": "absolute"}}
                          onClickBtnHandler={() => onClickAddCardHandler()}
                          name={"Add New Card"} btnName={"Add Card"} placeholderName={"Enter name of Card"}
                          open={true}/>
    } else {
        return (
            <Box className={classes.packsWrp}>
                <div className={classes.packsList}>
                    <div className={classes.packsListAdd}>
                        <button className={classes.backBtn} onClick={backBtnHandler}><ArrowBackIcon></ArrowBackIcon>
                        </button>
                        <TextField onChange={e => ohChangeInputHandler(e)} size={"small"}
                                   className={classes.searchInput} id="outlined-basic" label="Search"
                                   variant="outlined"/>
                        <Button className={classes.addNewPackBtn} onClick={addNewCardButtonHandler} variant="contained">Add
                            new
                            Card</Button>
                    </div>
                    <CardListTable cardPacks={cardPacks} cardsTotalCount={cardsTotalCount} cardMaxGrade={cardMaxGrade}/>
                </div>
            </Box>
        )
    }


}
