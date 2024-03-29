import {Navigate} from "react-router-dom";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../app/store";
import classes from './Packs.module.css'
import {PackListTable} from "./PackListTable/PackListTable";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {RangeSlider} from "../../common/components/RangeSlider/RangeSlider";

import {ControlledSwitches} from "../../common/components/ControlledSwitches/ControlledSwitches";
import {useEffect, useState} from "react";
import {useDebounce} from "usehooks-ts";
import {
    addNewPackTC,
    setCurrentPage,
    setIsModalActive,
    setNewPackName,
    setPackName,
    setPageCount
} from "./packs-reducer";
import TablePagination from "@mui/material/TablePagination";
import {PackModal} from "../Modal/PackModal";


export const Packs = () => {
    const isLoggedIn = useSelector((state: AppStateType) => state.login.isLoggedIn)
    const cardPacksTotalCount = useSelector((state: AppStateType) => state.packs.cardPacksTotalCount)
    const isModalActive = useSelector((state: AppStateType) => state.packs.isModalActive)
    const newPackName = useSelector((state: AppStateType) => state.packs.newPackName)
    const isPackPrivate = useSelector((state: AppStateType) => state.packs.isPackPrivate)


    const dispatch = useDispatch()

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 1000)


    const ohChangeInputHandler = (e: any) => {
        setValue(e.currentTarget.value)
    }

    useEffect(() => {
        dispatch(setPackName({packName: value}))
    }, [debouncedValue])

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }


    const handleChangePage = (event: unknown, newPage: number) => {

        dispatch(setCurrentPage({page: newPage + 1}))
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPageCount({pageCount: +event.target.value}))
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const addButtonHandler = () => {
        isModalActive ? dispatch(setIsModalActive({isModalActive: false})) : dispatch(setIsModalActive({isModalActive: true}))
    }

    const onClickAddPackHandler = () => {
        // @ts-ignore
        dispatch(addNewPackTC(newPackName, isPackPrivate))
        dispatch(setNewPackName({newPackName: ""}))
        dispatch(setIsModalActive({isModalActive: false}))
    }

    if (isModalActive) {
        return <PackModal style={{"position": "absolute"}} onClickBtnHandler={() => onClickAddPackHandler()}
                          name={"Add Pack"} btnName={"Add Pack"} placeholderName={"Enter name of pack"}
                          open={true}/>
    } else {
        return (
            <div className={classes.packsWrp}>
                <div className={classes.packsSideBar}>
                    <div className={classes.packsFilter}>
                        <h5>PACKS FILTER</h5>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <ControlledSwitches  />
                        </div>
                    </div>
                    <TextField onChange={e => ohChangeInputHandler(e)} size={"small"}
                               className={classes.searchInput} id="outlined-basic" label="Search"
                               variant="outlined"/>
                    <div className={classes.rangeSlider}>
                        <h5>PACKS RANGER</h5>
                        <RangeSlider/>
                    </div>
                    <Button variant="contained" className={classes.addNewPackBtn} onClick={addButtonHandler}>Add
                        Pack</Button>
                </div>

                <div className={classes.packsList}>
                    <PackListTable/>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={cardPacksTotalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        )

    }


}
