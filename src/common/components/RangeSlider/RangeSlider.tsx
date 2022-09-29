import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useDispatch, useSelector} from "react-redux";
import {useDebounce} from 'usehooks-ts'
import {
    fetchMyPacksTC,
    fetchMyRangedPacksTC,
    rangePacks,
    setMaxCardsCount,
    setMinCardsCount
} from '../../../features/Packs/packs-reducer';
import {useEffect, useRef, useState} from "react";
import {AppStateType} from '../../../app/store';
import {initializeAppTC} from "../../../app/app-reducer";


function valuetext(value: number) {
    return `${value}`;
}

export const RangeSlider = React.memo(() => {
    const dispatch = useDispatch()
    const minValue = useSelector((state: AppStateType) => state.packs.minCardsCount)
    const maxValue = useSelector((state: AppStateType) => state.packs.maxCardsCount)
    const userId = useSelector((state: AppStateType) => state.app.userId)

    const [value, setValue] = useState([minValue, maxValue])
    const debouncedValue = useDebounce(value, 1000)

    const handleChange = (event: Event, newValue: number | number[]) => {
        localStorage.setItem('rangeCountValue', JSON.stringify(newValue))
        setValue(newValue as number[])
        dispatch(setMinCardsCount({minCardsCount: value[0]}))
        dispatch(setMaxCardsCount({maxCardsCount: value[1]}))
    };

    useEffect(() => {
        // @ts-ignore
        dispatch(initializeAppTC())
        let rangeValueFromLocalStorage = localStorage.getItem('rangeCountValue')
        if (rangeValueFromLocalStorage) {
            setValue(JSON.parse(rangeValueFromLocalStorage))
            dispatch(setMinCardsCount({minCardsCount: JSON.parse(rangeValueFromLocalStorage)[0]}))
            dispatch(setMaxCardsCount({maxCardsCount: JSON.parse(rangeValueFromLocalStorage)[1]}))
        }
    }, [])

    const firstUpdate = useRef(true);
    useEffect(() => {
        let rangeValueFromLocalStorage = JSON.parse(localStorage.getItem('rangeCountValue')!)
        let switcherValueFromLocalStorage = JSON.parse(localStorage.getItem('switcher')!)
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if(switcherValueFromLocalStorage) {
            if (rangeValueFromLocalStorage) {
                // @ts-ignore
                dispatch(fetchMyRangedPacksTC(userId, rangeValueFromLocalStorage[0], rangeValueFromLocalStorage[1]))
            } else {
                // @ts-ignore
                dispatch(fetchMyPacksTC(userId))
            }
        } else {
            if (rangeValueFromLocalStorage) {
                // @ts-ignore
                dispatch(rangePacks(rangeValueFromLocalStorage[0], rangeValueFromLocalStorage[1]))
            } else {
                // @ts-ignore
                dispatch(rangePacks(value[0], value[1]))
            }
        }


        console.log("range slider")
    }, [debouncedValue]);

    return (
        <Box sx={{width: "70%"}}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                size={"small"}
            />
        </Box>
    )
})
