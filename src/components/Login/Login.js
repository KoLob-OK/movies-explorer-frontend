import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './Login.css';

import logo from '../../images/logo.svg';

const Login = () => {
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    }

    return (
        <section className='section__block section__block_type_login'>
            <div className='login__container'>
                <div className='login__wrapper'>
                    <div className='login__header'>
                        <img className='login__logo'
                             src={logo}
                             alt='Логотип в форме кольца'
                             onClick={navigateHome}
                        />
                    </div>
                    <h1 className='login__title'>Рады видеть!</h1>

                    <form className='form login__form'>

                        <label className='login__label' htmlFor='email'>E-mail</label>
                        <input className='login__input'
                               type='email'
                               name='email'
                               placeholder='Email'
                               value='myemail@yandex.ru'
                               // onChange={}
                               required
                        />
                        <span className='login__input-error' id='email-error'>
                    Email Error Message
                </span>

                        <label className='login__label' htmlFor='password'>Пароль</label>
                        <input className='login__input'
                               type='password'
                               name='password'
                               placeholder='Пароль'
                               value='password'
                               // onChange={}
                               required
                        />
                        <span className='login__input-error' id='password-error'>Password Error Message</span>
                    </form>
                </div>


                <div className='login__bottom'>
                    <button className='login__button'
                            type='submit'>Войти
                    </button>
                    <p className='login__link-text'>
                        Ещё не зарегистрированы?
                        <Link className='login__link' to='/sign-in'>
                            Регистрация
                        </Link>
                    </p>
                </div>

            </div>

        </section>
    )
};

export default Login;
