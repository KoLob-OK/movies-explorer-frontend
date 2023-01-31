import React from 'react';
import {useNavigate} from "react-router-dom";

import './Navigation.css';

const Navigation = () => {
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    }
    const navigateFilms = () => {
        navigate('/movies');
    }
    const navigateSavedFilms = () => {
        navigate('/saved-movies');
    }
    const navigateProfile = () => {
        navigate('/profile');
    }

    const [isOpen, setIsOpen] = React.useState(false);

    function toggleMenu() {
        setIsOpen((state) => !state);
    }

    return (
        <div className='navigation'>
            <button
                type='button'
                className='navigation__open-button'
                aria-label='Меню'
                onClick={toggleMenu}/>

            <div
                className={`navigation__menu ${
                    isOpen ? 'navigation__menu_opened' : ''
                }`}
            >
                <nav className='navigation__panel'>
                    <button
                        type='button'
                        className='navigation__close-button'
                        aria-label='Закрыть'
                        onClick={toggleMenu}/>

                    <ul className='navigation__list'>
                        <li className='navigation__list-item'>
                            <span className='navigation__link' onClick={navigateHome}>
                                Главная
                            </span>
                        </li>
                        <li className='navigation__list-item'>
                            <span
                                className='navigation__link navigation__link_active'
                                onClick={navigateFilms}
                            >
                                Фильмы
                            </span>
                        </li>
                        <li className='navigation__list-item'>
                            <span className='navigation__link' onClick={navigateSavedFilms}>
                                Сохранённые фильмы
                            </span>
                        </li>
                        <li className='navigation__list-item'>
                            <button className='navigation__button-profile' onClick={navigateProfile}>
                                <span className='navigation__link navigation__link_type_profile'
                                      onClick={navigateProfile}>Аккаунт</span>
                                <div className='navigation__logo-profile' />
                            </button>

                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Navigation;
