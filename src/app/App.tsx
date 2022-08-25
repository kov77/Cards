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
import {useAppSelector} from "./store";
import LinearProgress from '@mui/material/LinearProgress';
import { Packs } from '../features/Packs/Packs';

const App = () => {
    const status = useAppSelector((state) => state.app.status )
    // const dispatch = useDispatch()
    //
    // useEffect(() => {
    //         // @ts-ignore
    //         dispatch(initializeAppTC())
    // }, [ ])

    return (
        <BrowserRouter>
            <div className="container">
                <Sidebar />
                <div className="App">
                    {status === "loading" && <LinearProgress style={{"width": "100%"}} color="secondary"/>}
                    <Routes>
                        <Route path={'/login'} element={<SignIn />} />
                        <Route path={'/profile'} element={<Profile />} />
                        <Route path={'/newpass'} element={<NewPassword />} />
                        <Route path={'/recovery'} element={<Recovery />} />
                        <Route path={'/registration'} element={<Registration />} />
                        <Route path={'/error'} element={<Error />} />
                        <Route path={'packs'} element={<Packs />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
