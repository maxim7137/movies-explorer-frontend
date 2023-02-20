import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // реакт роутер

import FilterCheckbox from './FilterCheckbox';

function SearchForm({ handleSearch }) {
  let location = useLocation().pathname;
  const [inputData, setInputData] = useState(''); // Данные в поле поиска
  const [shortChecked, setShortChecked] = useState(false); // состояние чек-бокса
  const [isInputValid, setIsInputValid] = useState(true); // Стейты для валидации

  const errorMessage = 'Нужно ввести ключевое слово'; // Сообщение об ошибке

  // Обработчик изменения инпута для валидации
  function handleInput() {
    setIsInputValid(true);
  }

  // Обработчик фокуса
  function handleBlur() {
    setIsInputValid(true);
  }

  // управление данными
  function handleChange(e) {
    setInputData(e.target.value);
  }

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      setIsInputValid(form.checkValidity());
      if (form.checkValidity()) {
        if (location === '/movies') {
          localStorage.setItem(
            'moviesSearchState',
            JSON.stringify({ inputData, shortChecked })
          );
        }
        handleSearch(inputData, shortChecked);
      }
    },
    [handleSearch, inputData, location, shortChecked]
  );

  useEffect(() => {
    if (location === '/movies') {
      if (localStorage.getItem('moviesSearchState')) {
        setInputData(
          JSON.parse(localStorage.getItem('moviesSearchState')).inputData
        );
        setShortChecked(
          JSON.parse(localStorage.getItem('moviesSearchState')).shortChecked
        );
      }
    }
  }, [location]);

  return (
    <section className="search">
      <div className="search__border">
        <form
          className={
            isInputValid
              ? 'search__container'
              : 'search__container search__container_error'
          }
          noValidate
          onSubmit={handleSubmit}
          onBlur={handleBlur}
        >
          <div
            className={
              isInputValid
                ? 'search__wrap search__wrap_input'
                : 'search__wrap search__wrap_input search__wrap_error'
            }
          >
            <input
              className="search__text"
              onChange={handleChange}
              onInput={handleInput}
              value={inputData || ''}
              type="text"
              placeholder="Фильм"
              name="search"
              autoComplete="off"
              required
              noValidate
            />
            <button className="search__find" type="submit"></button>
            <div className="search__separator"></div>
          </div>
          <div className="search__wrap search__wrap_checkbox">
            <FilterCheckbox
              shortChecked={shortChecked}
              setShortChecked={setShortChecked}
            />
            <span className="search__short">Короткометражки</span>
          </div>
        </form>
        <span
          className={
            isInputValid
              ? 'search__error'
              : 'search__error search__error_visible'
          }
        >
          {errorMessage}
        </span>
      </div>
    </section>
  );
}

export default SearchForm;
