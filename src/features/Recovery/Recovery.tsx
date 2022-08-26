import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Card from '@mui/material/Card';
import {Navigate, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {restorePasswordTC} from "./recovery-reducer";
import {AppStateType} from "../../app/store";

export const Recovery = () => {
    const dispatch = useDispatch()
debugger
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            from: "test-front-admin <ai73a@yandex.by>",
            // можно указать разработчика фронта)
            message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/newpass/$token$'>
link</a>
</div>`
        }
        // @ts-ignore
        dispatch(restorePasswordTC(data))
        event.currentTarget.reset()

    };
    const theme = createTheme();
    const recoveryRequestStatus = useSelector((state:AppStateType) => state.recovery.recoveryRequestStatus)

    if(recoveryRequestStatus) {
    return <Navigate to="/recoverymodal"/>
}
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
                                    Send link
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
}
