import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, } from 'react-router-dom';
import './App.css';
import {Error} from "../features/Error/Error";
import {SignIn} from "../features/Login/Login";
import {NewPassword} from "../features/NewPassword/NewPassword";
import {Profile} from "../features/Profile/Profile";
import {Recovery} from "../features/Recovery/Recovery";
import { Registration } from '../features/Registration/Registration';
import {Sidebar} from "../features/Sidebar/Sidebar";
import {initializeAppTC, setStatus} from "./app-reducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./store";
import LinearProgress from '@mui/material/LinearProgress';

function App() {
    const dispatch = useDispatch()
    const status = useAppSelector((state) => state.app.status )

    useEffect(() => {
        dispatch(setStatus({status: 'loading'}))
            // @ts-ignore
            dispatch(initializeAppTC())
            dispatch(setStatus({status: 'success'}))
    }, [])

    return (
        <BrowserRouter>
            <div className="container">
                <Sidebar />
                <div className="App">
                    {status === "loading" && <LinearProgress style={{"width": "100%"}} color="secondary"/>}
                    <Routes>
                        <Route path={'/profile'} element={<Profile />} />
                        <Route path={'/login'} element={<SignIn />} />
                        <Route path={'/newpass'} element={<NewPassword />} />
                        <Route path={'/recovery'} element={<Recovery />} />
                        <Route path={'/registration'} element={<Registration />} />
                        <Route path={'/error'} element={<Error />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
