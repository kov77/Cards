import {Navigate} from "react-router-dom";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../app/store";
import classes from './Packs.module.css'
import { PackListTable } from "./PackListTable/PackListTable";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import {RangeSlider} from "../../common/components/RangeSlider/RangeSlider";
import {useEffect} from "react";
import {fetchPacksTC} from "./packs-reducer";
import { initializeAppTC } from "../../app/app-reducer";

export const Packs = (props: any) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppStateType) => state.login.isLoggedIn)

    useEffect(() => {
        // @ts-ignore
        dispatch(initializeAppTC())
        if(isLoggedIn) {
            // @ts-ignore
            dispatch(fetchPacksTC())
        }
    }, [isLoggedIn])

    if(!isLoggedIn) {
        return <Navigate to="/login"/>
    }


    return (
        <div className={classes.packsWrp}>
            <div className={classes.packsSideBar}>
                <h5>Show packs cards</h5>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button sx={{width:"80px", height: "35px"}} variant="contained">My</Button>
                    <Button sx={{width:"80px", height: "35px"}} variant="contained">All</Button>
                </ButtonGroup>
                <div className={classes.rangeSlider}>
                    <h5>Number of cards</h5>
                    <RangeSlider />
                </div>
            </div>

            <div className={classes.packsList}>
                <div className={classes.packsListAdd
                }>
                    <TextField size={"small"} className={classes.searchInput} id="outlined-basic" label="Search" variant="outlined" />
                    <Button className={classes.addNewPackBtn} variant="contained">Add new Pack</Button>
                </div>
                <PackListTable />

                </div>
        </div>
    )
}
