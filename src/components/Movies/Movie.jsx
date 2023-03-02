import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MinToHours from '../../utils/MinToHours';
import isSavedCard from '../../utils/isSavedCard';
import { useState } from 'react';
import get_idByMovieId from '../../utils/get_idByMovieId';

function Movie({
  country,
  director,
  duration,
  year,
  description,
  trailerLink,
  nameRU,
  nameEN,
  movieId,
  image,
  thumbnail,
  _id,
  cardClass,
  addCard,
  delCard,
  savedMovies,
}) {
  return <h1>Проверка</h1>;
}

export default Movie;
