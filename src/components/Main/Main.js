import React from 'react';

import './Main.css';

import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

const Main = ({isLoggedIn}) => {
    return (
        <>
            <main className='main'>
                <Promo isLoggedIn={isLoggedIn} />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
                <Footer />
            </main>
        </>
    )
};

export default Main;
