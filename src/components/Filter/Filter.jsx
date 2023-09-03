import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/contactsslice'; 
import css from './Filter.module.css';

export const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.contacts.filter);

    const handleChange = (event) => { 
    dispatch(setFilter(event.target.value));
    };

    return (
    <div className={css.container}>
        <label className={css.filterLabel} htmlFor="filterInput">
        Find contacts by Name
        </label>
        <input
        id="filterInput"
        className={css.filterName}
        type="text"
        name="filter"
        placeholder="Enter filter"
        value={filter}
        onChange={handleChange}
        aria-label="Filter contacts by name"
        />
    </div>
    );
};