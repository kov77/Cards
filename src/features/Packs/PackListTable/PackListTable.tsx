import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import classes from "../Packs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../app/store";
import {deletePackTC, fetchPacksTC, setCurrentPage, setPageCount} from "../packs-reducer";
import {getCardsTC} from "../../Cards/cards-reducer";
import {Navigate} from "react-router-dom";


interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'cards', label: 'Cards', minWidth: 100 },
    {
        id: 'last_updated',
        label: 'Last Updated',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'created_by',
        label: 'Created by',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

type actionsType = "delete" | "edit" | "remove"

interface Data {
    id: string;
    name: string;
    cards: number;
    last_updated: number;
    created_by: number;
    actions?: actionsType[];
}


function createData(
    id: string,
    name: string,
    cards: number,
    last_updated: number,
    created_by: number,
    actions: actionsType[]
): Data {
    return { id, name, cards, last_updated, created_by, actions};
}



export const PackListTable = React.memo((() => {
    const dispatch = useDispatch()
    const cardPacks = useSelector((state: AppStateType) => state.packs.cardPacks)
    const isRedirect = useSelector((state: AppStateType) => state.packs.isRedirect)
    const pageCardsCount = useSelector((state: AppStateType) => state.cards.pageCardsCount)

    let rows: any = []

    cardPacks.forEach((pack: any) => {
        rows.push(createData(pack._id, pack.name, pack.cardsCount, pack.updated.split('T')[0], pack.user_name,  ['delete']))
    })

    if(isRedirect) {
        return <Navigate to="/Cards"/>
    }

    const onClickPackHandle = (e: any, id: string) => {
        // @ts-ignore
        dispatch(getCardsTC(id, pageCardsCount))
    }

    const deleteButtonHandler = (id: string) => {
        // @ts-ignore
        dispatch(deletePackTC(id))
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any) => {
                                return (
                                    <TableRow key={row.id} hover tabIndex={-1}>
                                        {columns.map((column) => {

                                            const value = row[column.id];
                                            if((typeof value) !== "object") {
                                                return <TableCell onClick={(e) => onClickPackHandle(e, row.id)} key={column.id} align={column.align}>{value}</TableCell>
                                            } else {
                                                return <TableCell> <button key={column.id} onClick={() => deleteButtonHandler(row.id)} className={classes.actionsBtn}>{value}</button> </TableCell>
                                            }

                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}))
