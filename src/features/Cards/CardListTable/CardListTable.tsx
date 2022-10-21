import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useDispatch, useSelector} from "react-redux";
import Rating from '@mui/material/Rating';
import { setCurrentPage, setPageCount } from '../../Packs/packs-reducer';
import {cardType, setPageCardsCount} from "../cards-reducer";

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'question', label: 'Question', minWidth: 170 },
    { id: 'answer', label: 'Answer', minWidth: 100 },
    {
        id: 'last_updated',
        label: 'Last Updated',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'grade',
        label: 'Grade',
        minWidth: 170,
        align: 'right',
    },
];

interface Data {
    id: string;
    question: string;
    answer: string
    last_updated: string;
    grade: number
}

function createData(
    id: string,
    question: string,
    answer: string,
    last_updated: string,
    grade: number
): Data {
    return { id, question, answer, last_updated, grade };
}




export function CardListTable(props: any) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [ratingValue, setValue] = React.useState<number | null>(2);

    const dispatch = useDispatch()

    const pageFromLocalStorage = localStorage.getItem('currentPage')

    let rows: any = []
    props.cardPacks.forEach((card: cardType) => {
        rows.push(createData(card._id, card.answer,  card.question, card.updated.split('T')[0],  props.cardMaxGrade))
    })


    // const handleChangePage = (event: unknown, newPage: number) => {
    //     localStorage.setItem('currentPage', JSON.stringify(newPage))
    //     dispatch(setCurrentPage({page: newPage}))
    //     setPage(newPage);
    // };
    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setCurrentPage({page: newPage}))
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPageCardsCount({pageCardsCount: +event.target.value}))
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // if(pageFromLocalStorage !== "" && pageFromLocalStorage !== null) {
    //     setPage(+JSON.parse(pageFromLocalStorage))
    // }

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
                                    <TableRow key={row.id} hover tabIndex={-1}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if((typeof value) === "string") {
                                                return <TableCell key={column.id} align={column.align}>{value}</TableCell>
                                            } else {
                                                return <TableCell>
                                                    <Rating
                                                        name="simple-controlled"
                                                        value={ratingValue}
                                                        onChange={(event, newValue) => {
                                                            setValue(newValue);
                                                        }}
                                                        style={{"display": "flex", "justifyContent": "center"}}
                                                    />
                                                </TableCell>
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
                count={props.cardsTotalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
