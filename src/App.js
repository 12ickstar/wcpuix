import { BrowserRouter as Router , Route, Switch } from "react-router-dom";
import "./styles/output.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import React , {useState} from 'react';
import {HomeContext} from './MainContext';

function App() {
    const [Value , setValue] = useState({'Myname':'','Myaddrs':'','HomeState':true,'UserExist':false,'saap':'','dee':''});
    
    function renderpages(){
        if (localStorage.getItem('CHATSTATE') == 'TRUE'){return <Chat />} else {
            if (Value.HomeState){return <Home />} else {if (Value.UserExist){return <Login />} else {return <SignUp />}}
        };
    };

    return (
        <HomeContext.Provider value={{Value,setValue}}>
        {renderpages()}
        </HomeContext.Provider>
    );
};

export default App;
