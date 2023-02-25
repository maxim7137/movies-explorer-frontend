import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // реакт роутер
import { INPUT_EMPTY } from '../../constants/constants'; // переменные

import FilterCheckbox from './FilterCheckbox'; // jsx

function SearchForm({ handleSearch, shortChecked, setShortChecked }) {
  let location = useLocation().pathname;
  const [inputData, setInputData] = useState(''); // Данные в поле поиска
  const [isInputValid, setIsInputValid] = useState(true); // Стейты для валидации

  const handleSavedChange = useCallback(() => {
    handleSearch(inputData, shortChecked);
  }, [handleSearch, inputData, shortChecked]);

  // Обработчик изменения инпута для валидации
  function handleInput() {
    setIsInputValid(true);
    if (location === '/saved-movies') {
      handleSavedChange();
    }
  }

  // Обработчик фокуса
  function handleBlur() {
    setIsInputValid(true);
    if (location === '/saved-movies') {
      handleSavedChange();
    }
  }

  // управление данными
  function handleChange(e) {
    setInputData(e.target.value);
    if (location === '/saved-movies') {
      handleSavedChange();
    }
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

  // для сортировки всех фильмов при переключении короткометражек
  const handleShortChecked = useCallback(
    (shortNowChecked) => {
      if (JSON.parse(localStorage.getItem('moviesSearchState'))) {
        const inputStorageData = JSON.parse(
          localStorage.getItem('moviesSearchState')
        ).inputData;
        if (location === '/movies') {
          localStorage.setItem(
            'moviesSearchState',
            JSON.stringify({
              inputData: inputStorageData,
              shortChecked: shortNowChecked,
            })
          );
        }
        handleSearch(inputStorageData, shortNowChecked);
      }
    },
    [handleSearch, location]
  );

  // вставляем данные из локального хранилища
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
  }, [location, setShortChecked]);

  // сортировка сохраненных фильмов
  useEffect(() => {
    if (location === '/saved-movies') {
      handleSavedChange();
    }
  }, [location, inputData, shortChecked, handleSavedChange]);

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
              handleSavedChange={handleSavedChange}
              handleShortChecked={handleShortChecked}
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
          {INPUT_EMPTY}
        </span>
      </div>
    </section>
  );
}

export default SearchForm;
