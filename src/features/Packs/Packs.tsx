import {Navigate} from "react-router-dom";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../app/store";
import classes from './Packs.module.css'
import {PackListTable} from "./PackListTable/PackListTable";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {RangeSlider} from "../../common/components/RangeSlider/RangeSlider";
import {useEffect} from "react";
import {fetchPacksTC} from "./packs-reducer";
import {ControlledSwitches} from "../../common/components/ControlledSwitches/ControlledSwitches";

export const Packs = (props: any) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppStateType) => state.login.isLoggedIn)
    const maxCardsCount = useSelector((state: AppStateType) => state.packs.maxCardsCount)
    const minCardsCount = useSelector((state: AppStateType) => state.packs.minCardsCount)
    const cardPacksTotalCount = useSelector((state: AppStateType) => state.packs.cardPacksTotalCount)


    useEffect(() => {
        // @ts-ignore
        dispatch(fetchPacksTC(minCardsCount, maxCardsCount))
    }, [maxCardsCount, minCardsCount, cardPacksTotalCount])

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <div className={classes.packsWrp}>
            <div className={classes.packsSideBar}>
                <h5>Show packs cards</h5>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <ControlledSwitches/>
                </div>
                <div className={classes.rangeSlider}>
                    <h5>Number of cards</h5>
                    <RangeSlider/>
                </div>
            </div>

            <div className={classes.packsList}>
                <div className={classes.packsListAdd
                }>
                    <TextField size={"small"} className={classes.searchInput} id="outlined-basic" label="Search"
                               variant="outlined"/>
                    <Button className={classes.addNewPackBtn} variant="contained">Add new Pack</Button>
                </div>
                <PackListTable/>
            </div>
        </div>
    )
}
