import React from 'react';

import './MoviesCard.css';

const MoviesCard = ({ movie }) => {
    return (
        <li className='card'>
            <img className='card__image' src={movie.image} alt={movie.name} />
                <div className='card__wrapper'>
                    <h3 className='card__name'>{movie.name}</h3>
                    <button className={`card__like ${movie.isLiked ? 'card__like_active' : ''}`} type='button' aria-label='Лайк' />
                </div>
                <p className='card__duration'>{movie.duration}</p>
        </li>
    );
}

export default MoviesCard;
