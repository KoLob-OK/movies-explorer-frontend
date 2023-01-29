import React from 'react';

import './FilterCheckbox.css';

const FilterCheckbox = () => {
    return (
        <label className='filter__checkbox'>
            <span className='filter__checkbox-name'>Короткометражки</span>
            <input
                type='checkbox'
                className='filter__checkbox-default'
            />
            <span className='filter__checkbox-button'/>
        </label>
    );
}

export default FilterCheckbox;

