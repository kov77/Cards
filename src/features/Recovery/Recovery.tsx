import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Card from '@mui/material/Card';
import {Navigate, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../app/store";
import {restorePasswordTC} from "./recovery-reducer";

export const Recovery = React.memo(() => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppStateType) => state.login.isLoggedIn)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            from: "test-front-admin <ai73a@yandex.by>",
            // можно указать разработчика фронта)
            message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`
        }
        // @ts-ignore
        dispatch(restorePasswordTC(data))
        event.currentTarget.reset()

    };
    const theme = createTheme();

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Card sx={{minWidth: 275}}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Typography component="h1" variant="h5">
                                Restore Password
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    type="email"
                                    id="email"
                                    autoComplete="current-email"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Send Email
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <NavLink className={"navlink"} to="/registration">
                                            {"Sign Up"}
                                        </NavLink>
                                    </Grid>
                                    <Grid item xs>
                                        <NavLink className={"navlink"} to="/login">
                                            {"Login"}
                                        </NavLink>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </Card>
            </ThemeProvider>
        </div>
    );
})
