import React from 'react';

import './Movies.css';

import Header from '../Header/Header';
import SearchForm from "../SearchForm/SearchForm";

const Movies = () => {
    return (
        <main className="main">
            <Header />
            <SearchForm />
        </main>
    );
}

export default Movies;
