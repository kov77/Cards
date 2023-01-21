import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../app/store";
import classes from "./modal.module.css";

import Button from '@mui/material/Button';
import {setIsCardsModalActive, setNewAnswer, setNewQuestion} from "../Cards/cards-reducer";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function CardModal(props: any) {
    const newQuestion = useSelector((state: AppStateType) => state.cards.newQuestion)
    const newAnswer = useSelector((state: AppStateType) => state.cards.newAnswer)

    const dispatch = useDispatch()

    const onChangeQuestionHandler = (e: any) => {
        dispatch(setNewQuestion({newQuestion: e.currentTarget.value}))
    }
    const onChangeAnswerHandler = (e: any) => {
        dispatch(setNewAnswer({newAnswer: e.currentTarget.value}))
    }

    const onClickModalCloseHandler = () => {
        dispatch(setIsCardsModalActive({isCardsModalActive: false}))
    }

    return (
        <div>
            <Modal
                open={props.open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <button className={classes.modalClose} onClick={onClickModalCloseHandler}>X</button>
                    <div className={classes.modalWrp}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {props.name}
                        </Typography>
                        <div className={classes.modalFields}>
                            <OutlinedInput size={"small"} onChange={onChangeQuestionHandler} color={"primary"} value={newQuestion} placeholder={"Question"}/>
                            <OutlinedInput size={"small"} onChange={onChangeAnswerHandler} color={"primary"} value={newAnswer} placeholder={"Answer"}/>
                        </div>
                        <Button onClick={props.onClickBtnHandler} variant="contained">{props.btnName}</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
