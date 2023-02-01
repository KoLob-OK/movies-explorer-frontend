import React from 'react';

import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
    return (
        <section className='section__block section__block_type_search'>
            <div className='search__container'>
                <div className='search__field'>
                    <div className='search__wrapper'>
                        <input className='search__input' type='text' placeholder='Фильм'/>
                    </div>
                    <button className='search__button'>Найти</button>
                </div>
                <FilterCheckbox />
            </div>
        </section>
    );
}

export default SearchForm;
