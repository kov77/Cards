import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useDispatch, useSelector} from "react-redux";
import {useDebounce} from 'usehooks-ts'
import {
    fetchMyPacksTC,
    fetchMyRangedPacksTC,
    rangePacks, searchMyPackTC,
    searchMyRangedPackTC,
    searchRangedPackTC,
    setMaxCardsCount,
    setMinCardsCount,
    setSwitcher
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
    const pageCount = useSelector((state: AppStateType) => state.packs.pageCount)
    const userId = useSelector((state: AppStateType) => state.app.userId)
    const packName = useSelector((state: AppStateType) => state.packs.packName)
    const page = useSelector((state: AppStateType) => state.packs.page)

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
            dispatch(setSwitcher({switcher: switcherValueFromLocalStorage}))
        }

        if(switcherValueFromLocalStorage) {
            if (rangeValueFromLocalStorage) {
                if(packName) {
                    // @ts-ignore
                    dispatch(searchMyRangedPackTC(userId, packName, rangeValueFromLocalStorage[0], rangeValueFromLocalStorage[1], pageCount, page))
                } else {
                    // @ts-ignore
                    dispatch(fetchMyRangedPacksTC(userId, rangeValueFromLocalStorage[0], rangeValueFromLocalStorage[1], pageCount, page))
                }
            } else {
                if(packName) {
                    // @ts-ignore
                    dispatch(searchMyPackTC(userId, packName, pageCount, page))
                } else {
                    // @ts-ignore
                    dispatch(fetchMyPacksTC(userId, pageCount, page))
                }
            }
        } else {
            if (rangeValueFromLocalStorage) {
                if(packName) {
                    // @ts-ignore
                    dispatch(searchRangedPackTC(packName, rangeValueFromLocalStorage[0], rangeValueFromLocalStorage[1], pageCount, page))
                } else {
                    // @ts-ignore
                    dispatch(rangePacks(rangeValueFromLocalStorage[0], rangeValueFromLocalStorage[1], pageCount, page))
                }
            } else {
                if(packName) {
                    // @ts-ignore
                    dispatch(searchRangedPackTC(packName, value[0], value[1], pageCount, page))
                } else {
                    // @ts-ignore
                    dispatch(rangePacks(value[0], value[1], pageCount, page))
                }
            }
        }
        }, [debouncedValue, packName, pageCount, page]);

    return (
        <Box sx={{width: "70%"}}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                size={"small"}
                style={{"color": "#0020ff"}}
            />
        </Box>
    )
})
