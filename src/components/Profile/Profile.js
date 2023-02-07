import React, {useState, useEffect, useContext} from 'react';

import './Profile.css';

import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import useForm from '../../hooks/useForm';
import { UserContext } from '../../context/UserContext';

const Profile = ({ isLoggedIn, onUpdateUser }) => {
    const user = useContext(UserContext);
    const [welcomeName, setWelcomeName] = useState(user.name)
    const [isEditMode, setIsEditMode] = useState(false);
    const [error, setError] = useState('');
    const {enteredValues, errors, handleChange, isFormValid} = useForm({});

    async function handleSubmit(e) {
        e.preventDefault();

        try {
           const user = await onUpdateUser(enteredValues.name, enteredValues.email);
           if(user) {
               setWelcomeName(user.name);
           }
        } catch(e) {
            setError('Упс');
        }
    }

    const FormError = () => {
        return Object.keys(errors).map(key => {
            return errors[key] ? <span className='profile__error' id='profile__error'>
                        {`${key}: ${errors[key]}`}
                    </span> : <></>
        })
    }

    return (
        <main className='main'>
            <Header isLoginPanelVisible={!isLoggedIn}>
                <Navigation/>
            </Header>
            <section className='section__block section__block_type_profile'>
                <div className='profile__container'>
                    <h1 className='profile__title'>{`Привет, ${welcomeName}!`}</h1>
                    <form className='form profile___form'>
                        <div className='profile__field'>
                            <label className='profile__label'>Имя</label>
                            <input className='profile__input'
                                   type='text'
                                   name='name'
                                   id='name'
                                   placeholder='Имя'
                                   minLength='2'
                                   maxLength='40'
                                   onChange={handleChange}
                                   required
                                   disabled={!isEditMode}
                            />
                        </div>
                        <div className='profile__field'>
                            <label className='profile__label'>E-mail</label>
                            <input className='profile__input'
                                   type='email'
                                   name='email'
                                   id='email'
                                   placeholder='Почта'
                                   onChange={handleChange}
                                   required
                                   disabled={!isEditMode}
                            />
                        </div>
                    </form>
                </div>
                {!isEditMode && (<div className='profile__bottom'>
                    <button className='profile__submit'
                    onClick={() => {setIsEditMode(true)}}>Редактировать</button>
                    <button className='profile__logout'>Выйти из аккаунта</button>
                </div>)}
                {isEditMode && (<div className='profile__bottom'>
                    <FormError />
                    {error && <span className='profile__error' id='profile__error'>
                        {error}
                    </span>}
                    <button className='profile__button'
                            type='submit'
                            onClick={handleSubmit}
                            disabled={!isFormValid}
                    >
                        Сохранить
                    </button>
                </div>)}
            </section>
        </main>
    );
}

export default Profile;
