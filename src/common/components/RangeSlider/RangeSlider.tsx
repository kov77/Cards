import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useDispatch, useSelector} from "react-redux";
import {rangePacksTC, setMaxCardsCount, setMinCardsCount} from "../../../features/Packs/packs-reducer";
import {AppStateType} from "../../../app/store";
import { useDebounce } from 'usehooks-ts'
import {useEffect} from "react";


function valuetext(value: number) {
    return `${value}`;
}

export const RangeSlider = () => {
    let maxCardsCount = useSelector((state: AppStateType) => state.packs.maxCardsCount)
    let minCardsCount = useSelector((state: AppStateType) => state.packs.minCardsCount)
    const dispatch = useDispatch()

    const [value, setValue] = React.useState<number[]>([minCardsCount, maxCardsCount]);
    const debouncedValue = useDebounce(value, 1000)

    useEffect(() => {
        let valueFromLocalStorage = localStorage.getItem('rangeCountValue')
        if(valueFromLocalStorage) {
            let minMax = JSON.parse(valueFromLocalStorage)
            setValue([minMax[0], minMax[1]])
            // @ts-ignore
            dispatch(rangePacksTC(minMax[0], minMax[1]))
        }
    }, [])

    useEffect(() => {
        // @ts-ignore
        dispatch(rangePacksTC(debouncedValue[0], debouncedValue[1]))
    }, [debouncedValue])

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        localStorage.setItem('rangeCountValue', JSON.stringify(newValue))
    };
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
    );
}
