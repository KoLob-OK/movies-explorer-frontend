import './Portfolio.css';

const Portfolio = () => {
    const projects = [
        {
            title: 'Статичный сайт',
            reference: 'https://kolob-ok.github.io/How-to-learn'
        },
        {
            title: 'Адаптивный сайт',
            reference: 'https://kolob-ok.github.io/Russian-travel'
        },
        {
            title: 'Одностраничное приложение',
            reference: 'https://github.com/KoLob-OK/react-mesto-api-full'
        },
    ];

    return (
        <section className='section__block section__block_type_portfolio'>
            <h3 className='portfolio__title'>Портфолио</h3>
            <ul className='portfolio__projects'>
                {projects.map((project) => (
                    <li className='portfolio__project'>
                        <a className='portfolio__link'
                           href={project.reference}
                           target='_blank'>
                            {project.title}
                            {/*если нужен клик по всей строке*/}
                            {/*<span className='portfolio__link-icon'>↗</span>*/}
                        </a>
                        <a className='portfolio__link-icon'
                           href={project.reference}
                           target='_blank'>
                            ↗
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    )
};

export default Portfolio;
