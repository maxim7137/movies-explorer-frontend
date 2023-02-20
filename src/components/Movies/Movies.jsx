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
  isFound,
  setIsFound,
  handleSearch,
  searching,
}) {
  useEffect(() => {
    if (localStorage.getItem('potentialUserEmail')) {
      localStorage.removeItem('potentialUserEmail'); // удаление имейла вошедшего пользователя из локального хранилища
    }
    if (localStorage.getItem('moviesListState')) {
      setFoundMovies(JSON.parse(localStorage.getItem('moviesListState'))); // найденные фильмы вставляем из локального хранилища
    }
  }, []);

  // загрузим все фильмы до сабмита чтоб они были сразу доступны для фильтрации при поиске
  useEffect(() => {
    if (!cardsBeatfilm[0]) {
      loadAllMovies()
        .then((result) => setCardsBeatfilm(result))
        .catch((error) => {
          setIsFound(FOUND_SEARCH_ERROR);
          console.log(error);
        });
    }
  }, [cardsBeatfilm, foundMovies, loadAllMovies, setCardsBeatfilm, setIsFound]);

  return (
    <main className="movies content body__main">
      <SearchForm handleSearch={handleSearch} />
      <MoviesCardList
        foundMovies={foundMovies}
        searching={searching}
        isFound={isFound}
      />
    </main>
  );
}

export default Movies;
