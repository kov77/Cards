import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useDispatch, useSelector} from 'react-redux';
import {setRegistrationDataTC} from './registration-reducer';
import {AppStateType} from "../../app/store";
import {Navigate, NavLink} from 'react-router-dom';
import {logoutTC} from "../Profile/profile-reducer";

const theme = createTheme();

export const Registration = React.memo(() => {
    const dispatch = useDispatch()
    const isRegistered = useSelector((state: AppStateType) => state.registration.isRegistered)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        // @ts-ignore
        dispatch(setRegistrationDataTC(data))
        event.currentTarget.reset()
        // @ts-ignore
        dispatch(logoutTC())
    };

    if (isRegistered) {
        return <Navigate to="/login"/>
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Card sx={{
                    minWidth: 275,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "20px 30px"
                }}>
                    <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <NavLink className={"navlink"} to="/login">
                                            Already have an account? Sign in
                                        </NavLink>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
})
