import React, { useState, useEffect } from 'react';

import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

import { MAX_DURATION_SHORT_MOVIE, deleteMoviesError, saveMoviesError, serverError } from '../../utils/constants';
import mainApi from '../../utils/MainApi';

const SavedMovies = ({ isLoggedIn, openPopup }) => {
    // Массив фильмов
    const [movies, setMovies] = useState([]);
    // Массив показываемых фильмов
    const [moviesShowed, setMoviesShowed] = useState([]);
    // Массив короткометражек
    const [moviesWithSwitcher, setMoviesWithSwitcher] = useState([]);
    // Массив показываемых короткометражек
    const [moviesShowedWithSwitcher, setMoviesShowedWithSwitcher] = useState([]);
    // Прелоадер
    const [isLoading, setIsLoading] = useState(false);
    // Переключатель "Короткометражки"
    const [moviesSwitcher, setMoviesSwitcher] = useState(false);
    // Данные из формы поиска
    const [moviesSearchValues, setMoviesSearchValues] = useState('');

    async function handleGetShorties(switcher) {
        let filterDataShowed;
        let filterData;

        if (switcher) {
            setMoviesShowedWithSwitcher(moviesShowed);
            setMoviesWithSwitcher(movies);
            filterDataShowed = moviesShowed.filter(({ duration }) => duration <= MAX_DURATION_SHORT_MOVIE);
            filterData = movies.filter(({ duration }) => duration <= MAX_DURATION_SHORT_MOVIE);
        } else {
            filterDataShowed = moviesShowedWithSwitcher;
            filterData = moviesWithSwitcher;
        }
        setMoviesShowed(filterDataShowed);
        setMovies(filterData);
    }

    async function handleGetMovies(searchValues, switcher) {
        setIsLoading(true);

        try {
            let filterData = movies.filter(({ nameRU }) => nameRU.toLowerCase().includes(searchValues.toLowerCase()));

            if (switcher) filterData = filterData.filter(({ duration }) => duration <= MAX_DURATION_SHORT_MOVIE);

            setMoviesShowed(filterData);
        } catch (err) {
            openPopup(saveMoviesError);
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSaveClick(movie, isSavedMovie) {
        if (!isSavedMovie) {
            try {
                await mainApi.delMovie(movie._id);
                setMovies((movies) =>
                    movies.filter((newSaved) => newSaved._id !== movie._id));
                setMoviesShowed((movies) =>
                    movies.filter((newSaved) => newSaved._id !== movie._id));
            } catch {
                openPopup(deleteMoviesError);
            }
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            mainApi
                .getSavedMovies()
                .then((data) => {
                    setMovies(data);
                    setMoviesShowed(data);
                })
                .catch(() => {
                    openPopup(serverError);
                });
        }
    }, [isLoggedIn]);

    return (
        <>
            <Header isLoginPanelVisible={!isLoggedIn}>
                <Navigation isMenuVisible={isLoggedIn}/>
            </Header>
            <main className='main'>
                <SearchForm handleGetMovies={handleGetMovies}
                            moviesSwitcher={moviesSwitcher}
                            moviesSearchValues={moviesSearchValues}
                            handleGetShorties={handleGetShorties}
                />
                {isLoading ? <Preloader/> : <MoviesCardList movies={moviesShowed}
                                                            savedMovies={moviesShowed}
                                                            restOfMovieList={[]}
                                                            onSaveMovie={handleSaveClick} />}
            </main>
            <Footer/>
        </>
    );
}

export default SavedMovies;
