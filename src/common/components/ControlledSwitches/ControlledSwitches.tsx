import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import classes from './ControlledSwitches.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchMyPacksTC, fetchMyRangedPacksTC, rangePacks} from "../../../features/Packs/packs-reducer";
import {AppStateType} from "../../../app/store";
import {useState} from "react";

export function ControlledSwitches() {
const dispatch = useDispatch()
    const minValue = useSelector((state: AppStateType) => state.packs.minCardsCount)
    const maxValue = useSelector((state: AppStateType) => state.packs.maxCardsCount)
    const userId = useSelector((state: AppStateType) => state.app.userId)

    let rangeValueFromLocalStorage = localStorage.getItem('rangeCountValue')
    let switcherValueFromLocalStorage = JSON.parse(localStorage.getItem('switcher')!)

    const[switcherValue, setSwitcherValue] = useState(switcherValueFromLocalStorage)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = !event.currentTarget.checked
        setSwitcherValue(value)

        localStorage.setItem('switcher', JSON.stringify(switcherValue))

        if(switcherValue) {
            if(rangeValueFromLocalStorage) {
                // @ts-ignore
                dispatch(fetchMyRangedPacksTC(userId, JSON.parse(rangeValueFromLocalStorage)[0], JSON.parse(rangeValueFromLocalStorage)[1]))
            } else {
                // @ts-ignore
                dispatch(fetchMyPacksTC(userId))
            }
        } else {
            if(rangeValueFromLocalStorage) {
                // @ts-ignore
                dispatch(rangePacks(JSON.parse(rangeValueFromLocalStorage)[0], JSON.parse(rangeValueFromLocalStorage)[1]))
            } else {
                // @ts-ignore
                dispatch(rangePacks(minValue, maxValue))
            }
        }
    };


    return (
        <FormGroup>
            <FormControlLabel className={classes.formControl} control={<Switch onChange={handleChange} />} label="My" />
        </FormGroup>
    );
}
