import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import classes from './ControlledSwitches.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchPacksTC} from "../../../features/Packs/packs-reducer";
import {AppStateType} from "../../../app/store";

export function ControlledSwitches() {
    // const [checked, setChecked] = React.useState(true);
const dispatch = useDispatch()
    const userId = useSelector((state: AppStateType) => state.app.userId)
    const maxCardsCount = useSelector((state: AppStateType) => state.packs.maxCardsCount)
    const minCardsCount = useSelector((state: AppStateType) => state.packs.minCardsCount)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setChecked(event.target.checked);
        if(event.target.checked) {
            // @ts-ignore
            dispatch(fetchPacksTC(minCardsCount, maxCardsCount, userId))
        } else {
            // @ts-ignore
            dispatch(fetchPacksTC(minCardsCount, maxCardsCount))
        }
    };


    return (
        <FormGroup>
            <FormControlLabel className={classes.formControl} control={<Switch onChange={handleChange} />} label="My" />
        </FormGroup>
    );
}
