import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import classes from './ControlledSwitches.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchMyPacksTC, fetchMyRangedPacksTC, rangePacks, setMaxCardsCount, setMinCardsCount} from "../../../features/Packs/packs-reducer";
import {AppStateType} from "../../../app/store";
import {useState} from "react";

export function ControlledSwitches() {
const dispatch = useDispatch()
    const minValue = useSelector((state: AppStateType) => state.packs.minCardsCount)
    const maxValue = useSelector((state: AppStateType) => state.packs.maxCardsCount)
    const userId = useSelector((state: AppStateType) => state.app.userId)
    const pageCount = useSelector((state: AppStateType) => state.packs.pageCount)
    const page = useSelector((state: AppStateType) => state.packs.page)

    let rangeValueFromLocalStorage = localStorage.getItem('rangeCountValue')
    let switcherValueFromLocalStorage = JSON.parse(localStorage.getItem('switcher')!)

    if(rangeValueFromLocalStorage) {
        dispatch(setMinCardsCount({minCardsCount: JSON.parse(rangeValueFromLocalStorage)[0]}))
        dispatch(setMaxCardsCount({maxCardsCount: JSON.parse(rangeValueFromLocalStorage)[1]}))
    }

    const[checked, setChecked] = useState(switcherValueFromLocalStorage)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.currentTarget.checked
        setChecked(value)
        localStorage.setItem('switcher', JSON.stringify(value))

        if(value) {
            // @ts-ignore
            dispatch(fetchMyRangedPacksTC(userId, minValue, maxValue, pageCount, page))
        } else {
            // @ts-ignore
            dispatch(rangePacks(minValue, maxValue, pageCount, page))
        }

    };


    return (
        <FormGroup>
            <FormControlLabel className={classes.formControl} checked={checked} control={<Switch style={{"color": "#0020ff"}} onChange={handleChange} />} label="My" />
        </FormGroup>
    );
}
