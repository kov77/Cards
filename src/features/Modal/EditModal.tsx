import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../app/store";
import {
    addNewPackTC,
    setIsPackPrivate,
    setIsEditModalActive,
    setIsModalActive,
    setNewPackName, editPackTC
} from '../Packs/packs-reducer';
import Button from '@mui/material/Button';
import classes from "./modal.module.css";

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

export function EditModal(props: any) {
    const newPackName = useSelector((state: AppStateType) => state.packs.newPackName)
    const packId = useSelector((state: AppStateType) => state.packs.packId)

    const dispatch = useDispatch()

    const onChangeInputHandler = (e: any) => {
        dispatch(setNewPackName({newPackName: e.currentTarget.value}))
    }

    const saveBtnHandler = () => {
        // @ts-ignore
        dispatch(editPackTC(packId, newPackName))
        dispatch(setNewPackName({newPackName: ""}))
    }


    const onClickModalCloseHandler = () => {
        dispatch(setIsModalActive({isModalActive: false}))
        dispatch(setIsEditModalActive({isEditModalActive: false}))
        dispatch(setNewPackName({newPackName: ""}))

    }

    return (
        <div>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <button className={classes.modalClose} onClick={onClickModalCloseHandler}>X</button>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {"Edit Pack Name"}
                    </Typography>
                    <div className={classes.modalFields}>
                        <OutlinedInput size={"small"} onChange={onChangeInputHandler} color={"primary"} value={newPackName}
                                       placeholder={"Enter New Pack Name"}/>
                        <Button onClick={saveBtnHandler} variant="contained">{"Save"}</Button>

                    </div>
                </Box>
            </Modal>
        </div>
    );
}
