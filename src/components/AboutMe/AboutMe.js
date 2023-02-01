import React from 'react';

import photo from '../../images/photo.png';
import './AboutMe.css';

const AboutMe = () => {
    const activity = {
        title: 'Github',
        ref: 'https://github.com/KoLob-OK'
    };

    return (
        <section className='section__block section__block_type_about-me' id='about-me'>
            <h2 className='section__title section__title_type_about-me'>Студент</h2>
            <div className='about-me__container'>
                <div className='about-me__text-wrapper'>
                    <h3 className='about-me__name'>Константин</h3>
                    <p className='about-me__job'>Фронтенд-разработчик, 42 года</p>
                    <p className='about-me__description'>
            Я родился в г. Саров Нижегородской области, с 1996 года живу в Нижнем Новгороде. Закончил факультет
            прикладной физики и микроэлектроники ННГУ. У меня есть любимые жена и сын. С молоком матери приучен к
            внимательности, аккуратности и настойчивости в достижении поставленной цели. Я люблю слушать музыку,
            а ещё увлекаюсь бегом. Недавно начал кодить. С 2000 года работаю в сфере торговли промышленным оборудованием
            и госзакупок, где практически достиг совершенства и в этой связи потянуло к освоению новых горизонтов, в
            частности в области IT. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
            ушёл с постоянной работы.
          </p>
                    <a className='link about-me__link'
                       href={activity.ref}
                       target='_blank'
                       rel='noreferrer'>{activity.title}</a>
                </div>
                <img className='about-me__photo' src={photo} alt='Фото студента' />
            </div>
        </section>
    )
};

export default AboutMe;
