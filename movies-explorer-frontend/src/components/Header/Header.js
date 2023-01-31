import React from 'react';
import {useNavigate} from "react-router-dom";
import './Header.css';

import headerLogo from '../../images/header-logo.svg';


const Header = ({isLoginPanelVisible, children}) => {
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    }

    return (
        <header className='header page__header' id='header'>
            <img
                className='header__logo'
                src={headerLogo}
                alt='Логотип в форме кольца'
                onClick={navigateHome}
            />
            {children}
            {isLoginPanelVisible && (
                <nav className='header__right-menu'>
                    <a href='/signup' className='link header__link'>Регистрация</a>
                    <button className='header__button-login'>Войти</button>
                </nav>
            )}        </header>
    )
};

export default Header;
