import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useDispatch, useSelector} from "react-redux";
import {fetchPacksTC, setMaxCardsCount, setMinCardsCount} from "../../../features/Packs/packs-reducer";
import {AppStateType} from "../../../app/store";

function valuetext(value: number) {
    return `${value}`;
}

export function RangeSlider() {
    const maxCardsCount = useSelector((state: AppStateType) => state.packs.maxCardsCount)
    const minCardsCount = useSelector((state: AppStateType) => state.packs.minCardsCount)

    const [value, setValue] = React.useState<number[]>([minCardsCount, maxCardsCount]);

    const dispatch = useDispatch()

    const handleChange = (event: Event, newValue: number | number[]) => {
        // @ts-ignore
        dispatch(fetchPacksTC(newValue[0], newValue[1]))
        setValue(newValue as number[]);

        // dispatch(setMinCardsCount({minCardsCount:value[0]}))
        // dispatch(setMaxCardsCount({maxCardsCount: value[1]}))
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
