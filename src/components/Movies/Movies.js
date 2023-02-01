import React from 'react';

import './Movies.css';

import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const Movies = ({ isLoading, isLoggedIn, onMovieSave }) => {

    return (
        <main className='main'>
            <Header isLoginPanelVisible={!isLoggedIn}>
                <Navigation/>
            </Header>
            <SearchForm />
            {isLoading ? <Preloader/> : <MoviesCardList onMovieSave={onMovieSave}/>}
            <Footer />
        </main>
    );
}

export default Movies;
