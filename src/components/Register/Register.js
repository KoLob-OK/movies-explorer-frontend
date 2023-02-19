import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Register.css';
import useForm from '../../hooks/useForm';
import { regExEmail, regExPassword } from '../../utils/constants';
import logo from '../../images/logo.svg';

const Register = ({ onRegister }) => {
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    }
    const {enteredValues, errors, handleChange, isFormValid, resetForm} = useForm({});

    useEffect(() => {
        resetForm();
        console.log('поля формы сброшены');
    }, [resetForm]);

    const handleSubmit = (e) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Проверяем, есть ли обязательные данные
        if (!enteredValues.name || !enteredValues.email || !enteredValues.password) {
            // если нет данных, то возвращаем
            return;
        }
        // если есть данные, то передаём значения управляемых компонентов во внешний обработчик
        onRegister(enteredValues);
    };

    return (
        <main className='main'>
            <section className='section__block section__block_type_register'>
                <form className='form register__container'
                      onSubmit={handleSubmit}
                      noValidate>
                    <div className='register__wrapper'>
                        <div className='register__header'>
                            <img className='link register__logo'
                                 src={logo}
                                 alt='Логотип в форме кольца'
                                 onClick={navigateHome}
                            />
                        </div>
                        <h1 className='register__title'>Добро пожаловать!</h1>

                        <div className='register__form'>
                            <label className='register__label' htmlFor='name'>Имя</label>
                            <input
                                className='register__input'
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Имя'
                                value={enteredValues.name || ''}
                                onChange={handleChange}
                                minLength={2}
                                maxLength={30}
                                autoComplete='off'
                                required
                            />
                            <span className='register__input-error' id='name-error'>{errors.name}</span>

                            <label className='register__label' htmlFor='email'>E-mail</label>
                            <input className='register__input'
                                   type='email'
                                   name='email'
                                   id='email'
                                   placeholder='Введите Email'
                                   value={enteredValues.email || ''}
                                   onChange={handleChange}
                                   autoComplete='off'
                                   pattern={regExEmail}
                                   required
                            />
                            <span className='register__input-error' id='email-error'>{errors.email}</span>

                            <label className='register__label' htmlFor='password'>
                                Пароль (должен содержать минимум 8 символов, не менее 1 заглавной буквы, 1 строчной
                                буквы, 1 цифры и 1 специального символа)
                            </label>
                            <input className='register__input'
                                   type='password'
                                   name='password'
                                   id='password'
                                   placeholder='Пароль'
                                   value={enteredValues.password || ''}
                                   onChange={handleChange}
                                   minLength={8}
                                   autoComplete='off'
                                   pattern={regExPassword}
                                   required
                            />
                            <span className='register__input-error' id='password-error'>{errors.password}</span>
                        </div>
                    </div>

                    <div className='register__bottom'>
                        <button className='register__button'
                                type='submit'
                                disabled={!isFormValid}>Зарегистрироваться
                        </button>
                        <p className='register__link-text'>
                            Уже зарегистрированы?
                            <Link className='link register__link' to='/sign-in'>
                                Войти
                            </Link>
                        </p>
                    </div>
                </form>
            </section>
        </main>
    )
};

export default Register;
