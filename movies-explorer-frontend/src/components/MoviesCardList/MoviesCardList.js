import React from 'react';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

import {movies} from '../../utils/initialMovies';

function MoviesCardList() {
    return (
        <section className='section__block section__block_type_movies'>
            <ul className='movies__cards'>
                {movies.map((movie, index) => (
                    <MoviesCard movie={movie} key={index}/>
                ))}
            </ul>
            <button className='movies__button'>Ещё</button>
        </section>
    );
}

export default MoviesCardList;
