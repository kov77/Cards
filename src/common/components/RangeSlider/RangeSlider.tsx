import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useDispatch, useSelector} from "react-redux";
import {useDebounce} from 'usehooks-ts'
import {fetchPacksTC, rangePacks, setMaxCardsCount, setMinCardsCount} from '../../../features/Packs/packs-reducer';
import {useEffect, useRef, useState} from "react";
import {AppStateType} from '../../../app/store';


function valuetext(value: number) {
    return `${value}`;
}

export const RangeSlider = React.memo(() => {
    const dispatch = useDispatch()
    const minValue = useSelector((state: AppStateType) => state.packs.minCardsCount)
    const maxValue = useSelector((state: AppStateType) => state.packs.maxCardsCount)

    const [value, setValue] = useState([minValue, maxValue])
    const debouncedValue = useDebounce(value, 1000)

    const handleChange = (event: Event, newValue: number | number[]) => {
        localStorage.setItem('rangeCountValue', JSON.stringify(newValue))
        setValue(newValue as number[])
        dispatch(setMinCardsCount({minCardsCount: value[0]}))
        dispatch(setMaxCardsCount({maxCardsCount: value[1]}))
    };

    useEffect(() => {
        let valueFromLocalStorage = localStorage.getItem('rangeCountValue')
        if (valueFromLocalStorage) {
            setValue(JSON.parse(valueFromLocalStorage))
            dispatch(setMinCardsCount({minCardsCount: JSON.parse(valueFromLocalStorage)[0]}))
            dispatch(setMaxCardsCount({maxCardsCount: JSON.parse(valueFromLocalStorage)[1]}))
        }
    }, [])

    const firstUpdate = useRef(true);
    useEffect(() => {
        let valueFromLocalStorage = localStorage.getItem('rangeCountValue')
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (valueFromLocalStorage) {
            // @ts-ignore
            dispatch(rangePacks(JSON.parse(valueFromLocalStorage)[0], JSON.parse(valueFromLocalStorage)[1]))
        } else {
            // @ts-ignore
            dispatch(rangePacks(value[0], value[1]))
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
