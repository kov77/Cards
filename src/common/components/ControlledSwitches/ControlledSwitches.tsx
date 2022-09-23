import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import classes from './ControlledSwitches.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchMyPacksTC, fetchPacksTC} from "../../../features/Packs/packs-reducer";
import {AppStateType} from "../../../app/store";
import {useEffect, useState} from "react";

export function ControlledSwitches() {
const dispatch = useDispatch()
    const userId = useSelector((state: AppStateType) => state.packs.userId)

    const[trigger, setTrigger] = useState(false)
    let maxCardsCount = useSelector((state: AppStateType) => state.packs.maxCardsCount)
    let minCardsCount = useSelector((state: AppStateType) => state.packs.minCardsCount)

    useEffect(() => {
        const triggerFromLocalStorage = localStorage.getItem('AllMyTrigger')
        if(triggerFromLocalStorage) {
            setTrigger(JSON.parse(triggerFromLocalStorage))
        }
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrigger(event.target.checked)
        localStorage.setItem('AllMyTrigger', JSON.stringify(event.target.checked))
        if(!trigger) {
            // @ts-ignore
            dispatch(fetchMyPacksTC(userId))
        } else {
            // @ts-ignore
            dispatch(rangePacksTC(minCardsCount, maxCardsCount))
        }
    };


    return (
        <FormGroup>
            <FormControlLabel className={classes.formControl} control={<Switch onChange={handleChange} />} label="My" />
        </FormGroup>
    );
}
