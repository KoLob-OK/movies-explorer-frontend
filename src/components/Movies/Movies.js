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
import mainApi from '../../utils/MainApi';
import { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '../../utils/utils';
import {
    MOVIES_BASE_URL,
    downloadMoviesError,
    searchMoviesError,
    deleteMoviesError,
    saveMoviesError,
} from '../../utils/constants';
import getRenderMoviesCount from '../../utils/getRenderMoviesCount';

const Movies = ({ isLoggedIn }) => {
    // Массив фильмов
    const [movies, setMovies] = useState([]);
    // Массив сохраненных в БД на сервере фильмов
    const [moviesSaved, setMoviesSaved] = useState([]);
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
    // Счетчик фильмов
    const [moviesCount, setMoviesCount] = useState([]);
    // Переключатель "Короткометражки"
    const [moviesSwitcher, setMoviesSwitcher] = useState(false);
    // Данные из формы поиска
    const [moviesSearchValues, setMoviesSearchValues] = useState('');
    // Ничего не найдено
    const [nothingSearched, setNothingSearched] = useState(false);

    useEffect(() => {
        setMoviesCount(getRenderMoviesCount());
        const handlerResize = () => setMoviesCount(getRenderMoviesCount());
        window.addEventListener('resize', handlerResize);

        return () => {
            window.removeEventListener('resize', handlerResize);
        };
    }, []);

    function handleMore() {
        const spliceMovies = movies;
        const newMoviesShowed = moviesShowed.concat(spliceMovies.splice(0, moviesCount[1]));
        setMoviesShowed(newMoviesShowed);
        setMovies(spliceMovies);
    }

    // console.log(moviesSaved)

    async function handleGetMovies(searchValues) {
        setMoviesSwitcher(false);
        addToLocalStorage('moviesSwitcher', null);

        if (!searchValues) {
            setErrorMessage(searchMoviesError);
            setIsPopupOpen(true);
            return false;
        }

        setErrorMessage('');
        setIsLoading(true);

        try {
            const movies = await moviesApi.getMovies();
            const filterData = movies.filter(({ nameRU }) => nameRU.toLowerCase().includes(searchValues.toLowerCase()));
            const filterDataWithLiked = filterData.map(item => ({...item, isLiked: moviesSaved.some(saved => saved.movieId === item.id)}));
            addToLocalStorage('movies', JSON.stringify(filterDataWithLiked));
            addToLocalStorage('moviesSearchValues', searchValues);

            const spliceData = filterDataWithLiked.splice(0, moviesCount[0]);

            if(filterData.length === 0) {
                setNothingSearched(true)
            }
            setMoviesShowed(spliceData);
            setMovies(filterDataWithLiked);
            setMoviesShowedWithSwitcher(spliceData);
            setMoviesWithSwitcher(filterDataWithLiked);
        } catch (err) {
            setErrorMessage(downloadMoviesError);
            setIsPopupOpen(true);
            setMovies([]);
            removeFromLocalStorage('movies');
            removeFromLocalStorage('moviesSwitcher');
            removeFromLocalStorage('moviesSearchValues');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGetShorties(switcher) {
        let filterDataShowed;
        let filterData;

        if (switcher) {
            setMoviesShowedWithSwitcher(moviesShowed);
            setMoviesWithSwitcher(movies);
            filterDataShowed = moviesShowed.filter(({ duration }) => duration <= 40);
            filterData = movies.filter(({ duration }) => duration <= 40);
        } else {
            filterDataShowed = moviesShowedWithSwitcher;
            filterData = moviesWithSwitcher;
        }

        addToLocalStorage('movies', JSON.stringify(filterDataShowed.concat(filterData)));
        addToLocalStorage('moviesSwitcher', switcher);
        setMoviesShowed(filterDataShowed);
        setMovies(filterData);
    }

    async function handleSaveClick(movie, isSavedMovie) {
        if (isSavedMovie) {
            const dataMovies = {
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
            try {
                await mainApi.saveMovie(dataMovies);
                const newSaved = await mainApi.getSavedMovies();
                setMoviesSaved(newSaved);
            } catch(err) {
                setErrorMessage(saveMoviesError);
                setIsPopupOpen(true);
                console.log(`Произошла ошибка при сохранении фильма: ${err}`);
            }
        } else {
            try {
                await mainApi.delMovie(movie._id);
                const newSaved = await mainApi.getSavedMovies();
                setMoviesSaved(newSaved);
            } catch(err) {
                setErrorMessage(deleteMoviesError);
                setIsPopupOpen(true);
                console.log(`Произошла ошибка при удалении фильма: ${err}`);
            }
        }
    }

    function closePopup() {
        setIsPopupOpen(false);
        setErrorMessage('');
    }

    function closePopupNothingSearched() {
        setNothingSearched(false);
    }

    useEffect(() => {
        if (isLoggedIn) {
            const jwt = getFromLocalStorage('jwt');
            if (!jwt) {
                return;
            }
            mainApi
                .getSavedMovies()
                .then((data) => {
                    setMoviesSaved(data);
                    console.log('Сохраненные фильмы успешно загружены');
                })
                .catch((err) => {
                    setErrorMessage(downloadMoviesError);
                    setIsPopupOpen(true);
                    console.log(`Произошла ошибка при загрузке фильмов: ${err}`);
                });

            const localStorageMovies = getFromLocalStorage('movies');

            if (localStorageMovies) {
                const filterData = JSON.parse(localStorageMovies);
                setMoviesShowed(filterData.splice(0, getRenderMoviesCount()[0]));
                setMovies(filterData);
                setIsLoading(false);
            }

            const localStorageMoviesSwitcher = getFromLocalStorage('moviesSwitcher');
            const localStorageMoviesSearchValues = getFromLocalStorage('moviesSearchValues');

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
                            handleGetShorties={handleGetShorties}
                            moviesSwitcher={moviesSwitcher}
                            moviesSearchValues={moviesSearchValues}
                />
                {isLoading ? <Preloader/> : <MoviesCardList movies={moviesShowed}
                                                            savedMovies={moviesSaved}
                                                            onSaveMovie={handleSaveClick}
                                                            restOfMovieList={movies}
                                                            handleMore={handleMore}/>}
            </main>
            <InfoTooltip isOpen={isPopupOpen}
                         message={errorMessage}
                         onClose={closePopup}
            />
            <InfoTooltip isOpen={nothingSearched}
                         message={'Ничего не найдено'}
                         onClose={closePopupNothingSearched}
            />
            <Footer/>
        </>
    );
}

export default Movies;
