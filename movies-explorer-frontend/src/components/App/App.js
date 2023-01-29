import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import './App.css';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="page">
            <Routes>
                <Route path="/" element={
                    <Main/>
                }/>
                <Route path="/movies" element={
                    <Movies isLoading={isLoading}/>
                }/>
            </Routes>
        </div>
    );
}

export default App;
