import React from 'react';

import './Promo.css';

import Header from '../Header/Header';
import promoImage from '../../images/promo-logo.svg';

const Promo = ({isLoggedIn}) => {
    const link = {
        title: "О проекте",
        ref: "#about-project"
    };

    return (
        <section className='promo' id='promo'>
            <Header isLoginPanelVisible={!isLoggedIn} />
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
                <button className="promo__button-more" onClick={() => {
                    document.location = link.ref
                }}>Узнать больше
                </button>
            </div>
        </section>
    )
};

export default Promo;
