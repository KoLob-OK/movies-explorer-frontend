import React from 'react';

import './Profile.css';

import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

const Profile = ({ isLoggedIn }) => {

    return (
        <main className='main'>
            <Header isLoginPanelVisible={!isLoggedIn}>
                <Navigation/>
            </Header>
            <section className='section__block section__block_type_profile'>
                <div className='profile__container'>
                    <h1 className='profile__title'>Привет, Константин!</h1>
                    <form className='profile___form'>
                        <div className='profile__field'>
                            <label className='profile__label'>Имя</label>
                            <input className='profile__input'
                                   type='text'
                                   value='Константин'
                            />
                        </div>
                        <div className='profile__field'>
                            <label className='profile__label'>E-mail</label>
                            <input className='profile__input'
                                   type='email'
                                   value='myemail@yandex.ru'
                            />
                        </div>
                    </form>
                </div>
                <div className='profile__bottom'>
                    <button className='profile__submit'>Редактировать</button>
                    <button className='profile__logout'>Выйти из аккаунта</button>
                </div>
            </section>
        </main>
    );
}

export default Profile;
