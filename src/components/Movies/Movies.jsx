import { useEffect, useState } from 'react';

import SearchForm from './SearchForm'; // jsx
import MoviesCardList from './MoviesCardList'; // jsx

import MoviesApi from '../../utils/MoviesApi'; // апи к фильмам
import NormCard from '../../utils/NormCard'; // функция для создания карточки для моего апи
import SearchMovies from '../../utils/SearchMovies'; // поиск фильмов

function Movies() {
  const [cardsBeatfilm, setCardsBeatfilm] = useState([]); // все начальные карточки
  const [foundMovies, setFoundMovies] = useState([]); // найденные карточки из локального хранилища, иначе пустой массив

  // <-- Функция загрузки всех фильмов
  function loadAllMovies() {
    MoviesApi.getInitialCards()
      .then((result) => {
        return result.map((rowCard) => NormCard(rowCard));
      })
      .then((NormCardArray) => {
        setCardsBeatfilm(NormCardArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Функция загрузки всех фильмов -- />

  useEffect(() => {
    loadAllMovies(); // загрузим все фильмы до сабмита чтоб они были сразу доступны для фильтрации при поиске
    // setFoundMovies(localStorage.getItem('moviesState').foundMovies);
    localStorage.removeItem('potentialUserEmail'); // удаление имейла вошедшего пользователя из локального хранилища
  }, []);

  // <-- Обработчика сабмита поиска
  function handleSearch(inputData, shortChecked) {
    setFoundMovies(SearchMovies(inputData, shortChecked, cardsBeatfilm));
  }

  return (
    <main className="movies content">
      <SearchForm handleSearch={handleSearch} foundMovies={foundMovies} />
      <MoviesCardList foundMovies={foundMovies} />
    </main>
  );
}

export default Movies;
