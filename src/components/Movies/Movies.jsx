import { useCallback, useEffect, useState } from 'react';

import SearchForm from './SearchForm'; // jsx
import MoviesCardList from './MoviesCardList'; // jsx

import MoviesApi from '../../utils/MoviesApi'; // апи к фильмам
import NormCard from '../../utils/NormCard'; // функция для создания карточки для моего апи
import SearchMovies from '../../utils/SearchMovies'; // поиск фильмов

function Movies() {
  const [cardsBeatfilm, setCardsBeatfilm] = useState([]); // все начальные карточки
  const [foundMovies, setFoundMovies] = useState([]); // найденные карточки из локального хранилища
  const [searching, setSearching] = useState(false); // загружается не загружается

  // <-- Функция загрузки всех фильмов
  async function loadAllMovies() {
    try {
      setSearching(true);
      const rowArray = await MoviesApi.getInitialCards();
      const normArray = rowArray.map((rowCard) => NormCard(rowCard));
      setCardsBeatfilm(normArray);
      return normArray;
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  }
  // Функция загрузки всех фильмов -- />

  useEffect(() => {
    if (localStorage.getItem('potentialUserEmail')) {
      localStorage.removeItem('potentialUserEmail'); // удаление имейла вошедшего пользователя из локального хранилища
    }
    if (localStorage.getItem('moviesListState')) {
      setFoundMovies(JSON.parse(localStorage.getItem('moviesListState'))); // найденные фильмы вставляем из локального хранилища
    }
  }, []);

  useEffect(() => {
    if (!cardsBeatfilm[0]) {
      loadAllMovies().then((result) => setCardsBeatfilm(result)); // загрузим все фильмы до сабмита чтоб они были сразу доступны для фильтрации при поиске
    }
  }, [cardsBeatfilm, foundMovies]);

  // <-- Обработчика сабмита поиска
  const handleSearch = useCallback(
    (inputData, shortChecked) => {
      loadAllMovies();
      const foundMoviesNow = SearchMovies(
        inputData,
        shortChecked,
        cardsBeatfilm
      );
      setFoundMovies(foundMoviesNow);
      localStorage.setItem('moviesListState', JSON.stringify(foundMoviesNow));
    },
    [cardsBeatfilm]
  );

  return (
    <main className="movies content">
      <SearchForm handleSearch={handleSearch} loadAllMovies={loadAllMovies} />
      <MoviesCardList foundMovies={foundMovies} searching={searching} />
    </main>
  );
}

export default Movies;
