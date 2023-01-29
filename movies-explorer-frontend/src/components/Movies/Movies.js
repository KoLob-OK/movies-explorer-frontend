import React from 'react';

import './Movies.css';

import Header from '../Header/Header';
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

const Movies = (isLoading) => {

    return (
        <main className="main">
            <Header />
            <SearchForm />
            {isLoading ? <Preloader/> : <div/>}
        </main>
    );
}

export default Movies;
