import { useCallback, useEffect, useState } from 'react';

import SearchForm from './SearchForm'; // jsx
import MoviesCardList from './MoviesCardList'; // jsx

import { FOUND_SEARCH_ERROR } from '../../constants/constants'; // константы

function Movies({
  foundMovies,
  setFoundMovies,
  cardsBeatfilm,
  setCardsBeatfilm,
  loadAllMovies,
  loadSavedMovies,
  savedMovies,
  setSavedMovies,
  isFound,
  setIsFound,
  handleSearch,
  searching,
  addCard,
  delCard,
  setFilteredMovies,
}) {
  useEffect(() => {
    if (localStorage.getItem('potentialUserEmail')) {
      localStorage.removeItem('potentialUserEmail'); // удаление имейла вошедшего пользователя из локального хранилища
    }
    if (localStorage.getItem('moviesListState')) {
      setFoundMovies(JSON.parse(localStorage.getItem('moviesListState'))); // найденные фильмы вставляем из локального хранилища
    }
  }, [setFoundMovies]);

  // загрузим все фильмы до сабмита чтоб они были сразу доступны для фильтрации при поиске
  useEffect(() => {
    if (cardsBeatfilm.length < 1) {
      loadAllMovies()
        .then((result) => setCardsBeatfilm(result))
        .catch((error) => {
          setIsFound(FOUND_SEARCH_ERROR);
          console.log(error);
        });

      loadSavedMovies()
        .then((result) => setSavedMovies(result))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [cardsBeatfilm]);

  // изменяем фильтрованный массив вслед за сохраненным
  useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [savedMovies]);

  return (
    <main className="movies content body__main">
      <SearchForm handleSearch={handleSearch} />
      <MoviesCardList
        foundMovies={foundMovies}
        savedMovies={savedMovies}
        searching={searching}
        isFound={isFound}
        addCard={addCard}
        delCard={delCard}
      />
    </main>
  );
}

export default Movies;
