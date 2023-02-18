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

  // загрузим все фильмы до сабмита чтоб они были сразу доступны для фильтрации при поиске
  useEffect(() => {
    loadAllMovies();
  }, []);

  // <-- Функция поиска
  function handleSearch(inputData, shortChecked) {
    let foundArray;

    function filterItemsObject(el, query) {
      let result = false;

      for (let key in el) {
        if (
          el[key]
            .toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) !== -1
        ) {
          result = true;
        }
      }
      return result;
    }

    function filterItemsArray(arr, query) {
      return arr.filter((el) => filterItemsObject(el, query));
    }

    if (shortChecked) {
      foundArray = cardsBeatfilm.filter((e) => e.duration <= 40);
    } else {
      foundArray = cardsBeatfilm;
    }
    const finalArray = filterItemsArray(foundArray, inputData);
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
