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
import {setCurrentPage} from '../../Packs/packs-reducer';
import {cardType, setGradeTC, setPageCardsCount} from "../cards-reducer";
import {AppStateType} from "../../../app/store";
import classes from "./../Cards.module.css"

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {id: 'question', label: 'Question', minWidth: 170},
    {id: 'answer', label: 'Answer', minWidth: 100},
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
    return {id, question, answer, last_updated, grade};
}


export function CardListTable(props: any) {
    const pageCardsCount = useSelector((state: AppStateType) => state.cards.pageCardsCount)
    const packId = useSelector((state: AppStateType) => state.packs.packId)

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const dispatch = useDispatch()

    const pageFromLocalStorage = localStorage.getItem('currentPage')

    const onChangeGradeHandler = (e: any, cardId: string) => {
        // @ts-ignore
        dispatch(setGradeTC(cardId, +e.currentTarget.value, packId, pageCardsCount))
    }

    let rows: any = []
    props.cardPacks.forEach((card: cardType) => {

        rows.push(createData(card._id, card.question, card.answer, card.updated.split('T')[0], card.grade))
    })

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setCurrentPage({page: newPage}))
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPageCardsCount({pageCardsCount: +event.target.value}))
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
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
                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            if ((typeof value) === "string") {
                                                return <TableCell key={index} align={column.align}>{value}</TableCell>
                                            } else {
                                                return <TableCell>
                                                    <Rating
                                                        name="simple-controlled"
                                                        value={row.grade}
                                                        onChange={(e: any) => onChangeGradeHandler(e, row.id)}
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
