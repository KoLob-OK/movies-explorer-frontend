import React from 'react';

import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Navigation from "../Navigation/Navigation";

const SavedMovies = ({ isLoading, isLoggedIn, onDeleteMovie }) => {
    return (
        <main className='main'>
            <Header isLoginPanelVisible={!isLoggedIn}>
                <Navigation isMenuVisible={isLoggedIn}/>
            </Header>
            <SearchForm />
            {isLoading ? <Preloader/> : <MoviesCardList onDeleteMovie={onDeleteMovie}/>}
            <Footer />
        </main>
    );
}

export default SavedMovies;
