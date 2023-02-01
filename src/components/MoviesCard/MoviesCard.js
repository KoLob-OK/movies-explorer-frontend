import React, {useEffect, useRef, useState} from 'react';

import './MoviesCard.css';

const MoviesCard = ({ movie, isSavedMoviesPage, onMovieSave, onMovieDelete }) => {
    const [isMouseInCard, setIsMouseInCard] = useState(false);
    const cardRef = useRef();
    // Создаём переменную, которую после зададим в `className` для кнопки сохранения
    const cardSaveButtonClassName = (`card__like ${movie.isLiked ? 'card__like_active' : ''}`);
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = 'card__del-button';

    useEffect(() => {
        const mouseOverListener = cardRef.current.addEventListener('mouseover', () => {
            setIsMouseInCard(true)
        });
        const mouseLeaveListener = cardRef.current.addEventListener('mouseleave', () => {
            setIsMouseInCard(false)
        });

        return () => {
            cardRef.current?.removeEventListener('mouseover', mouseOverListener)
            cardRef.current?.removeEventListener('mouseleave', mouseLeaveListener)
        }
    }, [cardRef]);

    // Обработчик клика кнопки сохранения
    function handleSaveClick() {
        onMovieSave(movie);
    }

    // Обработчик клика кнопки удаления
    function handleDeleteClick() {
        onMovieDelete(movie);
    }

    return (
        <li className='card' ref={cardRef}>
            <img className='card__image' src={movie.image} alt={movie.name}/>
            <div className='card__wrapper'>
                <h3 className='card__name'>{movie.name}</h3>
                {!isSavedMoviesPage &&
                    <button className={cardSaveButtonClassName}
                            type='button'
                            aria-label='Сохранить в коллекцию'
                            onClick={handleSaveClick}
                    />
                }
                {isMouseInCard && isSavedMoviesPage &&
                    <button className={cardDeleteButtonClassName}
                            type='button'
                            aria-label='Удалить'
                            onClick={handleDeleteClick}
                    />
                }
            </div>
            <p className='card__duration'>{movie.duration}</p>
        </li>
    );
}

export default MoviesCard;
