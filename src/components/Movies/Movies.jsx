import { useEffect, useState } from 'react';

import SearchForm from './SearchForm'; // jsx
import MoviesCardList from './MoviesCardList'; // jsx

import MoviesApi from '../../utils/MoviesApi'; // апи к фильмам
import NormCard from '../../utils/NormCard'; // функция для создания карточки для моего апи

function Movies() {
  const [cardsBeatfilm, setCardsBeatfilm] = useState([]); // все начальные карточки
  const [foundMovies, setFoundMovies] = useState([]); // все начальные карточки

  // удаление имейла вошедшего пользователя из локального хранилища
  useEffect(() => {
    localStorage.removeItem('potentialUserEmail');
  }, []);

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

  // <-- Функция поиска
  function handleSearch(inputData, shortChecked) {
    let foundArray;
    const filterItems = (arr, query) => {
      return arr.filter(
        (el) => el.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    };
    if (shortChecked) {
      foundArray = cardsBeatfilm.filter((e) => e.duration <= 40);
    } else {
      foundArray = cardsBeatfilm;
    }

    const finalArray = filterItems(foundArray, inputData);
    setFoundMovies(finalArray);
    // Функция поиска -- />
  }
  
  return (
    <main className="movies content">
      <SearchForm loadAllMovies={loadAllMovies} handleSearch={handleSearch} />
      <MoviesCardList foundMovies={foundMovies} />
    </main>
  );
}

export default Movies;
