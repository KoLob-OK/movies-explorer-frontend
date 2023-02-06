import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Register.css';
import useForm from '../../hooks/useForm';
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
    }, []);

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
        <section className='section__block section__block_type_register'>
            <div className='register__container'>
                <div className='register__wrapper'>
                    <div className='register__header'>
                        <img className='link register__logo'
                             src={logo}
                             alt='Логотип в форме кольца'
                             onClick={navigateHome}
                        />
                    </div>
                    <h1 className='register__title'>Добро пожаловать!</h1>

                    <form className='form register__form'
                          onSubmit={handleSubmit}
                          noValidate>
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
                               placeholder='Email'
                               value={enteredValues.email || ''}
                               onChange={handleChange}
                               autoComplete='off'
                               required
                        />
                        <span className='register__input-error' id='email-error'>{errors.email}</span>

                        <label className='register__label' htmlFor='password'>Пароль</label>
                        <input className='register__input'
                               type='password'
                               name='password'
                               id='password'
                               placeholder='Пароль'
                               value={enteredValues.password || ''}
                               onChange={handleChange}
                               minLength={6}
                               autoComplete='off'
                               required
                        />
                        <span className='register__input-error' id='password-error'>{errors.password}</span>
                    </form>
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

            </div>

        </section>
    )
};

export default Register;
