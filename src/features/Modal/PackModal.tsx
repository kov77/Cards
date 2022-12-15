import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../app/store";
import {
    addNewPackTC,
    setInputPrivateValue,
    setIsEditModalActive,
    setIsModalActive,
    setNewPackName
} from '../Packs/packs-reducer';
import Button from '@mui/material/Button';

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

export function PackModal(props: any) {
    const newPackName = useSelector((state: AppStateType) => state.packs.newPackName)
    const inputPrivateValue = useSelector((state: AppStateType) => state.packs.inputPrivateValue)

    const dispatch = useDispatch()

    const onChangeInputHandler = (e: any) => {
        dispatch(setNewPackName({newPackName: e.currentTarget.value}))
    }

    const onClickModalCloseHandler = () => {
        dispatch(setIsModalActive({isModalActive: false}))
        dispatch(setIsEditModalActive({isEditModalActive: false}))
    }

    const onChangeInputPrivateHandler = (e:any) => {
        dispatch(setInputPrivateValue({inputPrivateValue: e.currentTarget.isChecked}))
    }

    return (
        <div>
            <Modal
                open={props.open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {props.name}
                    </Typography>
                    <input type="checkbox" checked={inputPrivateValue} onChange={onChangeInputPrivateHandler}/>
                    <OutlinedInput size={"small"} onChange={onChangeInputHandler} color={"primary"} value={newPackName} placeholder={props.placeholderName}/>
                    <Button onClick={props.onClickBtnHandler} variant="contained">{props.btnName}</Button>
                    <button onClick={onClickModalCloseHandler}>X</button>
                </Box>
            </Modal>
        </div>
    );
}
