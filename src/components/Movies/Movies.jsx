import { useEffect, useState } from 'react';

import SearchForm from './SearchForm'; // jsx
import MoviesCardList from './MoviesCardList'; // jsx

import MoviesApi from '../../utils/MoviesApi'; // апи к фильмам
import NormCard from '../../utils/NormCard'; // функция для создания карточки для моего апи

function Movies() {
  const [cardsBeatfilm, setCardsBeatfilm] = useState([]); // все начальные карточки

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
  return (
    <main className="movies content">
      <SearchForm loadAllMovies={loadAllMovies} />
      <MoviesCardList cardsBeatfilm={cardsBeatfilm} />
    </main>
  );
}

export default Movies;
