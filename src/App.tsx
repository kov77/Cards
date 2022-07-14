import React from 'react';
import {BrowserRouter, Route, Routes, } from 'react-router-dom';
import './App.css';
import {Error} from "./components/Error/Error";
import {Login} from "./components/Login/Login";
import {NewPassword} from "./components/NewPassword/NewPassword";
import {Profile} from "./components/Profile/Profile";
import {Recovery} from "./components/Recovery/Recovery";
import { Registration } from './components/Registration/Registration';
import {Sidebar} from "./components/Sidebar/Sidebar";

function App() {

    return (
        <BrowserRouter>
            <div className="container">
                <Sidebar />
                <div className="App">
                    <Routes>
                        <Route path={'/error'} element={<Error />} />
                        <Route path={'/login'} element={<Login />} />
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
