import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MinToHours from '../../utils/MinToHours';
import isSavedCard from '../../utils/isSavedCard';
import { useState } from 'react';

function MoviesCard({
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
  cardClass,
  savedMovies,
}) {
  let location = useLocation().pathname; // переменная для useLocation

  const [itIsSaved, setItIsSaved] = useState(false);

  // проверка сохранена ли карточка
  useEffect(() => {
    if (location === '/movies') {
      setItIsSaved(isSavedCard(savedMovies, movieId));
    }
  }, [location, movieId, savedMovies]);

  function handleClick() {}

  return (
    <li className="card">
      <div className="card__head">
        <div className="card__text">
          <p className="card__name">{nameRU}</p>
          <p className="card__duration">{MinToHours(duration)}</p>
        </div>
        <div className="card__save">
          <button
            className={itIsSaved && location === '/movies' ? `${cardClass} card__btn_saved` : cardClass}
            onClick={handleClick}
          ></button>
        </div>
      </div>
      <div className="card__body">
        <a
          className="card__link"
          href={trailerLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={image}
            alt={`Постер фильма: ${nameRU}`}
            className="card__img"
          />
        </a>
      </div>
    </li>
  );
}

export default MoviesCard;
