import { useState } from 'react';

import FilterCheckbox from './FilterCheckbox';

function SearchForm() {
  const [inputData, setInputData] = useState('');

  function handleChange(e) {
    setInputData(e.target.value);
  }

  return (
    <section className="search">
      <div className="search__border">
        <form className="search__container">
          <div className="search__wrap search__wrap_input">
            <input
              className="search__text"
              onChange={handleChange}
              value={inputData || ''}
              type="text"
              placeholder="Фильм"
              name="search"
              autoComplete="off"
              required
            />
            <button className="search__find" type="submit"></button>
            <div className="search__separator"></div>
          </div>
          <div className="search__wrap search__wrap_checkbox">
            <FilterCheckbox />
            <span className="search__short">Короткометражки</span>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
