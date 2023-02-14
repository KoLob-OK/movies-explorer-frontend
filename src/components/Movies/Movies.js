import React, { useState } from 'react';

import './Movies.css';

import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

const Movies = ({ isLoading, isLoggedIn, onSaveMovie }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    function closePopup() {
        setIsPopupOpen(false);
    }
    return (
        <>
            <Header isLoginPanelVisible={!isLoggedIn}>
                <Navigation isMenuVisible={isLoggedIn}/>
            </Header>
            <main className='main'>
                <SearchForm/>
                {isLoading ? <Preloader/> : <MoviesCardList onSaveMovie={onSaveMovie}/>}
            </main>
            <InfoTooltip isOpen={isPopupOpen}
                         onClose={closePopup}
            />
            <Footer/>
        </>
    );
}

export default Movies;
