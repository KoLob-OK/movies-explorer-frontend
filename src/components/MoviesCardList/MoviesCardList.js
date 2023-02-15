import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies, onSaveMovie, onDeleteMovie }) => {
    const location = useLocation();

    return (
        <section className='section__block section__block_type_movies'>
            <div className='movies__container'>
                <ul className='movies__cards'>
                    {movies.map((movie) => (
                        <MoviesCard
                            key={movie.movieId}
                            movie={movie}
                            isSavedMoviesPage={location.pathname === '/saved-movies'}
                            onSaveMovie={onSaveMovie}
                            onDeleteMovie={onDeleteMovie}
                        />
                    ))}
                </ul>
                <button className='movies__button'>Ещё</button>
            </div>
        </section>
    );
}

export default MoviesCardList;
