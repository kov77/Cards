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
import {useSelector} from "react-redux";
import {AppStateType} from "../../../app/store";

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
    name: string;
    cards: number;
    last_updated: number;
    created_by: number;
    actions?: actionsType[];
}

function createData(
    name: string,
    cards: number,
    last_updated: number,
    created_by: number,
    actions: actionsType[]
): Data {
    return { name, cards, last_updated, created_by, actions};
}




export function PackListTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const cardPacks = useSelector((state: AppStateType) => state.packs.cardPacks)

    // let name = '',
    //     cardsCount = 0,
    //     updated = 0,
    //     user_name = 0,
    //     actions: any = []
    let rows: any = []
    console.log(cardPacks)

    // @ts-ignore
    cardPacks.forEach((pack: any) => {
        console.log(pack)
            rows.push(createData(pack.name, pack.cardsCount, pack.updated, pack.user_name, ['delete']),
            )
            // createData(name, cardsCount, updated, user_name, actions),

        // return rows

    })





    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any) => {
                                return (
                                    <TableRow hover tabIndex={-1}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if((typeof value) === "string" || "number") {
                                                return <TableCell align={column.align}>{value}</TableCell>
                                            } else {
                                                return value.forEach((el: any) => <button className={classes.actionsBtn}>{el}</button>)
                                            }

                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
