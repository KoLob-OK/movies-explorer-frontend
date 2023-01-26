import React from 'react';

import './Promo.css';

import Header from '../Header/Header';
import promoImage from '../../images/promo-logo.svg';

const Promo = () => {
    const link = {
        title: "О проекте",
        ref: "#about-project"
    };

    return (
        <section className='promo'>
            <Header/>
            <div className='promo__container'>
                <div className='promo__text-container'>
                    <h1 className='promo__title'>
                        Учебный проект студента факультета Веб&#8209;разработки.
                    </h1>
                    <h2 className='promo__subtitle'>
                        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                    </h2>
                </div>
                <img className='promo__image' src={promoImage} alt='Глобус, сверстанный из слова web'/>
                <a className="promo__button-more" href={link.ref}>Узнать больше</a>
            </div>
        </section>
    )
};

export default Promo;
