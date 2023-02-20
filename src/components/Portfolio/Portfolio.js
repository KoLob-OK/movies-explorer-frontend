import React from 'react';

import './Portfolio.css';

const Portfolio = () => {
    const projects = [
        {
            title: 'Статичный сайт',
            ref: 'https://kolob-ok.github.io/How-to-learn'
        },
        {
            title: 'Адаптивный сайт',
            ref: 'https://kolob-ok.github.io/Russian-travel'
        },
        {
            title: 'Одностраничное приложение',
            ref: 'https://mesto-nn.students.nomoredomains.club'
        },
    ];

    return (
        <section className='section__block section__block_type_portfolio'>
            <h3 className='portfolio__title'>Портфолио</h3>
            <ul className='portfolio__projects'>
                {projects.map((project, index) => (
                    <li key={index} className='portfolio__project'>
                        <a className='link portfolio__link'
                           href={project.ref}
                           target='_blank'
                           rel='noopener noreferrer'>
                            {project.title}
                            {/*если нужен клик по всей строке*/}
                            {/*<span className='portfolio__link-icon'>↗</span>*/}
                        </a>
                        <a className='link portfolio__link-icon'
                           href={project.ref}
                           target='_blank'
                           rel='noopener noreferrer'>↗</a>
                    </li>
                ))}
            </ul>
        </section>
    )
};

export default Portfolio;
