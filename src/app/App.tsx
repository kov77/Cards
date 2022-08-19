import React from 'react';
import {BrowserRouter, Route, Routes, } from 'react-router-dom';
import './App.css';
import {Error} from "../features/Error/Error";
import {SignIn} from "../features/Login/Login";
import {NewPassword} from "../features/NewPassword/NewPassword";
import {Profile} from "../features/Profile/Profile";
import {Recovery} from "../features/Recovery/Recovery";
import { Registration } from '../features/Registration/Registration';
import {Sidebar} from "../features/Sidebar/Sidebar";

function App() {

    return (
        <BrowserRouter>
            <div className="container">
                <Sidebar />
                <div className="App">
                    <Routes>
                        <Route path={'/error'} element={<Error />} />
                        <Route path={'/login'} element={<SignIn />} />
                        <Route path={'/newpass'} element={<NewPassword />} />
                        <Route path={'/profile'} element={<Profile />} />
                        <Route path={'/recovery'} element={<Recovery />} />
                        <Route path={'/registration'} element={<Registration />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
