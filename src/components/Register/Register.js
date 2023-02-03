import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './Register.css';

import logo from '../../images/logo.svg';

const Register = () => {
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    }

    return (
        <section className='section__block section__block_type_register'>
            <div className='register__container'>
                <div className='register__wrapper'>
                    <div className='register__header'>
                        <img className='register__logo'
                             src={logo}
                             alt='Логотип в форме кольца'
                             onClick={navigateHome}
                        />
                    </div>
                    <h1 className='register__title'>Добро пожаловать!</h1>

                    <form className='form register__form'>
                        <label className='register__label' htmlFor='name'>Имя</label>
                        <input
                            className='register__input'
                            type='text'
                            name='name'
                            placeholder='Имя'
                            value='Константин'
                            required
                        />
                        <span className='register__input-error' id='name-error'>
                    Name Error Message - two strings, two strings, two strings, two strings, two strings, two strings, two strings, two strings
                </span>

                        <label className='register__label' htmlFor='email'>E-mail</label>
                        <input className='register__input'
                               type='email'
                               name='email'
                               placeholder='Email'
                               value='myemail@yandex.ru'
                               required
                        />
                        <span className='register__input-error' id='email-error'>
                    Email Error Message
                </span>

                        <label className='register__label' htmlFor='password'>Пароль</label>
                        <input className='register__input'
                               type='password'
                               name='password'
                               placeholder='Пароль'
                               value='password'
                               required
                        />
                        <span className='register__input-error' id='password-error'>Password Error Message</span>
                    </form>
                </div>


                <div className='register__bottom'>
                    <button className='register__button'
                            type='submit'>Зарегистрироваться
                    </button>
                    <p className='register__link-text'>
                        Уже зарегистрированы?
                        <Link className='register__link' to='/sign-in'>
                            Войти
                        </Link>
                    </p>
                </div>

            </div>

        </section>
    )
};

export default Register;
