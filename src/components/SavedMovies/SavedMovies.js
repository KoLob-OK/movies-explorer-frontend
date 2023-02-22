import React, { useState, useEffect } from 'react';

import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '../../utils/utils';
import { MAX_DURATION_SHORT_MOVIE, deleteMoviesError, saveMoviesError, serverError } from '../../utils/constants';
import mainApi from '../../utils/MainApi';

const SavedMovies = ({ isLoggedIn }) => {
    // Массив фильмов
    const [movies, setMovies] = useState([]);
    // Массив показываемых фильмов
    const [moviesShowed, setMoviesShowed] = useState([]);
    // Массив короткометражек
    const [moviesWithSwitcher, setMoviesWithSwitcher] = useState([]);
    // Массив показываемых короткометражек
    const [moviesShowedWithSwitcher, setMoviesShowedWithSwitcher] = useState([]);
    // Попап с информацией
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // Текст сообщения об ошибке
    const [errorMessage, setErrorMessage] = useState('');
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

        addToLocalStorage('movies', JSON.stringify(filterDataShowed.concat(filterData)));
        addToLocalStorage('moviesSwitcher', switcher);
        setMoviesShowed(filterDataShowed);
        setMovies(filterData);
    }

    async function handleGetMovies(searchValues, switcher) {
        setIsLoading(true);

        try {
            let filterData = movies.filter(({ nameRU }) => nameRU.toLowerCase().includes(searchValues.toLowerCase()));

            if (switcher) filterData = filterData.filter(({ duration }) => duration <= MAX_DURATION_SHORT_MOVIE);

            setMoviesShowed(filterData);

            if (searchValues) {
                addToLocalStorage('savedMovies', JSON.stringify(filterData));
                addToLocalStorage('savedMoviesSwitcher', switcher);
                addToLocalStorage('savedMoviesSearchValues', searchValues);
            } else {
                removeFromLocalStorage('savedMovies');
                removeFromLocalStorage('savedMoviesSwitcher');
                removeFromLocalStorage('savedMoviesSearchValues');
            }
        } catch (err) {
            setErrorMessage(saveMoviesError);
            setIsPopupOpen(true);

            setMovies([]);
            removeFromLocalStorage('savedMovies');
            removeFromLocalStorage('savedMoviesSwitcher');
            removeFromLocalStorage('savedMoviesSearchValues');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSaveClick(movie, isSavedMovie) {
        if (!isSavedMovie) {
            try {
                await mainApi.delMovie(movie._id);
                const newMovies = await mainApi.getSavedMovies();
                setMovies(newMovies)
                setMoviesShowed(newMovies);
            } catch {
                setErrorMessage(deleteMoviesError);
                setIsPopupOpen(true);
            }
        }
    }

    function closePopup() {
        setIsPopupOpen(false);
        setErrorMessage('');
    }

    useEffect(() => {
        if (isLoggedIn) {
            mainApi
                .getSavedMovies()
                .then((data) => {
                    console.log(data);
                    setMovies(data);
                    setMoviesShowed(data);
                })
                .catch((err) => {
                    setErrorMessage(serverError);
                    setIsPopupOpen(true);
                });

            const localStorageMovies = getFromLocalStorage('savedMovies');

            if (localStorageMovies) {
                setMovies(JSON.parse(localStorageMovies));
            }

            const localStorageMoviesSwitcher = getFromLocalStorage('savedMoviesSwitcher');
            const localStorageMoviesSearchValues = getFromLocalStorage('savedMoviesSearchValues');

            if (localStorageMoviesSwitcher) {
                setMoviesSwitcher(localStorageMoviesSwitcher === 'true');
            }

            if (localStorageMoviesSearchValues) {
                setMoviesSearchValues(localStorageMoviesSearchValues);
            }
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
            <InfoTooltip isOpen={isPopupOpen}
                         message={errorMessage}
                         onClose={closePopup}
            />
        </>
    );
}

export default SavedMovies;
