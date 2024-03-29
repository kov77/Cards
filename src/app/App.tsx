import React, { useEffect } from 'react';
import {BrowserRouter, Route, Routes, } from 'react-router-dom';
import './App.css';
import {Error} from "../features/Error/Error";
import {SignIn} from "../features/Login/Login";
import {NewPassword} from "../features/NewPassword/NewPassword";
import {Profile} from "../features/Profile/Profile";
import {Recovery} from "../features/Recovery/Recovery";
import { Registration } from '../features/Registration/Registration';
import {Sidebar} from "../features/Sidebar/Sidebar";
import {useAppSelector} from "./store";
import LinearProgress from '@mui/material/LinearProgress';
import { Packs } from '../features/Packs/Packs';
import {RecoveryModal} from "../features/Recovery/RecoveryModal";
import {useDispatch} from "react-redux";
import { initializeAppTC } from './app-reducer';
import {Cards} from "../features/Cards/Cards";

const App = () => {
    const status = useAppSelector((state) => state.app.status )
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(initializeAppTC())
    }, [])

    return (
        <BrowserRouter>
            {status === "loading" && <LinearProgress style={{"width": "100%"}} color="secondary"/>}
            <div style={{display: "flex"}} className="container">
                <Sidebar />

                <div className="App">
                    <Routes >
                        <Route path={'/login'} element={<SignIn />} />
                        <Route path={'/profile'} element={<Profile />} />
                        <Route path={'/newpass/*'} element={<NewPassword />} />
                        <Route path={'/recovery'} element={<Recovery />} />
                        <Route path={'/registration'} element={<Registration />} />
                        <Route path={'/error'} element={<Error />} />
                        <Route path={'/'} element={<Packs />} />
                        <Route path={'/recoverymodal'} element={<RecoveryModal />} />
                        <Route path={'/Cards'} element={<Cards />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
