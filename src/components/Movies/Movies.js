import React, {useEffect, useState} from 'react';

import './Movies.css';

import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import moviesApi from '../../utils/MoviesApi';
import { MOVIES_BASE_URL } from '../../utils/constants';

const Movies = ({ isLoggedIn, onSaveMovie }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [allMovies, setAllMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function closePopup() {
        setIsPopupOpen(false);
    }
    // Запрос фильмов с API BeatfilmMoviesApi
    async function getMovies() {
        setIsLoading(true);
        try {
            let movies = await moviesApi.getMovies();
            const dataMovies = (movie) => {
                return {
                    movieId: movie.id,
                    nameRU: movie.nameRU,
                    nameEN: movie.nameEN,
                    country: movie.country,
                    director: movie.director,
                    duration: movie.duration,
                    year: movie.year,
                    description: movie.description,
                    image: MOVIES_BASE_URL + movie.image.url,
                    trailerLink: movie.trailerLink,
                    thumbnail: MOVIES_BASE_URL + movie.image.formats.thumbnail.url,
                };
            }
            // Создание массива из полученных данных
            movies = movies.map(dataMovies);
            // Запись массива в стейт
            setAllMovies(movies);
        } catch {
            setIsPopupOpen(true);
            setErrorMessage('Произошла ошибка при получении фильмов');
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getMovies();
    }, [])

    return (
        <>
            <Header isLoginPanelVisible={!isLoggedIn}>
                <Navigation isMenuVisible={isLoggedIn}/>
            </Header>
            <main className='main'>
                <SearchForm/>
                {isLoading ? <Preloader/> : <MoviesCardList movies={allMovies} onSaveMovie={onSaveMovie}/>}
            </main>
            <InfoTooltip isOpen={isPopupOpen}
                         message={errorMessage}
                         onClose={closePopup}
            />
            <Footer/>
        </>
    );
}

export default Movies;
