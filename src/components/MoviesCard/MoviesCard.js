import React, { useEffect, useRef, useState } from 'react';

import './MoviesCard.css';

const MoviesCard = ({ movie, isSavedMoviesPage, onSaveMovie, onDeleteMovie }) => {
    const [isMouseInCard, setIsMouseInCard] = useState(false);
    // Создаем переменную ширины экрана устройства
    const [width, setWidth] = useState(window.innerWidth);
    // Задаем границу ширины мобильного устройства
    const isMobile = width < 768;
    const cardRef = useRef();
    // Создаём переменную, которую после зададим в `className` для кнопки сохранения
    const cardSaveButtonClassName = (`card__like ${movie.isLiked ? 'card__like_active' : ''}`);
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = 'link card__del-button';


    // Создаем эффект добавления/удаления слушателя наведения мыши на карточку
    useEffect(() => {
        const card = cardRef.current;
        let mouseOverListener, mouseLeaveListener;
        if(card){
            mouseOverListener = card.addEventListener('mouseover', () => {
                setIsMouseInCard(true)
            });
            mouseLeaveListener = card.addEventListener('mouseleave', () => {
                setIsMouseInCard(false)
            });
        }

        return () => {
            if(card) {
                card.removeEventListener('mouseover', mouseOverListener)
                card.removeEventListener('mouseleave', mouseLeaveListener)
            }
        }
    }, [cardRef.current]);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    // Обработчик клика кнопки сохранения
    function handleSaveClick() {
        onSaveMovie(movie);
    }

    // Обработчик клика кнопки удаления
    function handleDeleteClick() {
        onDeleteMovie(movie);
    }

    return (
        <li className='card' ref={cardRef}>
            <img className='card__image' src={movie.image} alt={movie.nameRU}/>
            <div className='card__wrapper'>
                <h3 className='card__name'>{movie.nameRU}</h3>
                {!isSavedMoviesPage &&
                    <button className={cardSaveButtonClassName}
                            type='button'
                            aria-label='Сохранить в коллекцию'
                            onClick={handleSaveClick}
                    />
                }
                {isMouseInCard && isSavedMoviesPage && !isMobile && !isMobile &&
                    <button className={cardDeleteButtonClassName}
                            type='button'
                            aria-label='Удалить'
                            onClick={handleDeleteClick}
                    />
                }
                {isMobile && isSavedMoviesPage &&
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
