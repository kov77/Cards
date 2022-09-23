import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import classes from './Login.module.css'
import Card from '@mui/material/Card';
import {Navigate, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../app/store";
import {setLoginDataTC} from "./login-reducer";
import {fetchPacksTC} from "../Packs/packs-reducer";

export const SignIn = React.memo(() => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppStateType) => state.login.isLoggedIn)


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
            rememberMe: formData.get('remember')
        }
        // @ts-ignore
        dispatch(setLoginDataTC(data))
    };

    const isChecked = true
    const theme = createTheme();

    if(isLoggedIn) {
        return <Navigate to="/"/>
    }

    return (
        <div className={classes.signInWrp}>
            <ThemeProvider theme={theme}>
                <Card sx={{ minWidth: 275 }}>
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
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                <LockIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" className={classes.formWrp} onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="remember" value={isChecked} color="primary"/>}
                                    label="Remember me"
                                    className={classes.rememberMeLabel}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <NavLink className={"navlink"} to="/recovery">
                                            Forgot password?
                                        </NavLink>
                                    </Grid>
                                    <Grid item xs>
                                        <NavLink className={"navlink"} to="/registration">
                                            {"Sign Up"}
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
