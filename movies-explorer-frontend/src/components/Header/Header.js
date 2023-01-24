import './Header.css';

import headerLogo from '../../images/header-logo.svg';
import profileLogo from '../../images/header-profile-logo.svg';


const Header = () => {
    return (
        <header className="header page__header">
            <nav className="header__left-menu">
                <img
                    className="header__logo"
                    src={headerLogo}
                    alt="Логотип в форме кольца"
                />
                <div className='header__films-navigation'>
                    <a href='#' className='header__films'>Фильмы</a>
                    <a href='#' className='header__films_saved'>Сохранённые фильмы</a>
                </div>
            </nav>
            <nav className="header__right-menu">
                <a href='/signup' className='header__link'>Регистрация</a>
                <button className="header__button">Войти</button>
                <button className='header__button-profile'>
                    <span className='header__button-text'>Аккаунт</span>
                    <div className="header__button-logo-container">
                        <img
                            className="header__logo-profile"
                            src={profileLogo}
                            alt="Логотип пользователя"
                        />
                    </div>
                </button>
            </nav>
        </header>
    )
};

export default Header;
