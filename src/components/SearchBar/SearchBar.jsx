import { useState } from 'react';
import PropTypes from 'prop-types';

import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search);
    setSearch('');
  };

  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <button className={css.searchForm_button} type="submit">
        <span className={css.searchForm_button_label}>Search</span>
      </button>

      <input
        className={css.searchForm_input}
        type="text"
        name="search"
        value={search}
        onChange={handleChange}
        placeholder="Search movie by name"
        autoComplete="off"
        autoFocus
        required
      />
    </form>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};