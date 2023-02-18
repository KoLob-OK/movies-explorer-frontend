import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

import CurrentUserContext from '../../context/CurrentUserContext';

import MainApi from '../../utils/MainApi';
import { authError, updateError, updateSuccess } from '../../utils/constants';
import { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '../../utils/utils';

function App() {
    // Логин
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Текущий пользователь
    const [currentUser, setCurrentUser] = useState({});
    // Попап
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    // Прелоадер
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
            const jwt = getFromLocalStorage('jwt');
            if (jwt) {
                getUserData();
            }
    }, []);

    async function getUserData() {
            setIsLoading(true);
            try {
                await MainApi.getUserData()
                    .then((data) => {
                        console.log(data);
                        setCurrentUser(data);
                        setIsLoggedIn(true);
                    });
            } catch (err) {
                console.log(`Произошла ошибка при авторизации: ${err}`);
            } finally {
                setIsLoading(false);
            }
    }

    async function onLogin(data) {
        setIsLoading(true);
        try {
            await MainApi.authorize(data)
                .then((res) => {
                    if (res.token) {
                        setIsLoggedIn(true);
                        addToLocalStorage('jwt', res.token);
                        MainApi.updateToken();
                        getUserData();
                        navigate('/movies');
                    }
                });
        } catch (err) {
            setErrorMessage(authError);
            setIsPopupOpen(true);
            console.log(`Произошла ошибка при авторизации: ${err}`);
        } finally {
            setIsLoading(false);
        }
    }

    async function onUpdateUser(name, email) {
        setIsLoading(true);
        const jwt = getFromLocalStorage('jwt');
        if (!jwt) {
            return;
        }
        try {
            await MainApi.changeUserData({name, email});
            setCurrentUser ({name, email});
            setErrorMessage(updateSuccess);
            setIsPopupOpen(true);
        } catch(err) {
            setErrorMessage(updateError);
            setIsPopupOpen(true);
            console.log(`Произошла ошибка при обновлении данных пользователя: ${err}`);
        } finally {
            setIsLoading(false);
        }
    }

    function onSignOut() {
        removeFromLocalStorage('jwt');
        removeFromLocalStorage('movies');
        removeFromLocalStorage('moviesSwitcher');
        removeFromLocalStorage('moviesSearchValues');
        removeFromLocalStorage('savedMovies');
        removeFromLocalStorage('savedMoviesSwitcher');
        removeFromLocalStorage('savedMoviesSearchValues');
        setIsLoggedIn(false);
        navigate('/sign-in');
    }

    function closePopup() {
        setIsPopupOpen(false);
        setErrorMessage('');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <Routes>

                    <Route path='/sign-up' element={
                        <Register/>
                    }/>

                    <Route path='/sign-in' element={
                        <Login onLogin={onLogin}/>
                    }/>

                    <Route path='/' element={
                        <Main isLoggedIn={isLoggedIn}/>
                    }/>

                    <Route path='/movies' element={
                        <Movies
                            isLoggedIn={isLoggedIn}
                        />
                    }/>

                    <Route path='/saved-movies' element={
                        <SavedMovies
                            isLoggedIn={isLoggedIn}
                        />
                    }/>

                    <Route path='/profile' element={
                        <Profile
                            isLoggedIn={isLoggedIn}
                            onUpdateUser={onUpdateUser}
                            isLoading={isLoading}
                            onSignOut={onSignOut}
                        />
                    }/>

                    <Route path='*' element={
                        <Page404/>
                    }/>

                </Routes>
                <InfoTooltip isOpen={isPopupOpen}
                             message={errorMessage}
                             onClose={closePopup}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
