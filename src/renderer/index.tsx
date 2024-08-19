import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {Home} from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Vaults from "./vaults";
import Vault from "./vault";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const Routing = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route index element={<Home/>}/>
                <Route path={"/vaults"} element={<Vaults/>}/>
                <Route path={"/vault/:id"} element={<Vault/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
}
root.render(
    <React.StrictMode>
        <Routing/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
