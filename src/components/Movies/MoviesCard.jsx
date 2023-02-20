import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MinToHours from '../../utils/MinToHours';
import isSavedCard from '../../utils/isSavedCard';
import { useState } from 'react';
import get_idByMovieId from '../../utils/get_idByMovieId';

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
  _id,
  cardClass,
  addCard,
  delCard,
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

  function handleRemove(e) {
    if (
      location === '/saved-movies' &&
      e.target.classList.contains('card__btn')
    ) {
      // e.currentTarget.remove();
    }
  }

  function handleClick() {
    if (location === '/movies') {
      if (itIsSaved) {
        const _id = get_idByMovieId(movieId, savedMovies);
        if (_id) {
          delCard(_id, movieId);
        }
      } else {
        setItIsSaved(true);
        addCard({
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
        });
      }
    } else {
      delCard(_id, movieId);
    }
  }

  return (
    <li className="card" onClick={handleRemove}>
      <div className="card__head">
        <div className="card__text">
          <p className="card__name">{nameRU}</p>
          <p className="card__duration">{MinToHours(duration)}</p>
        </div>
        <div className="card__save">
          <button
            className={
              itIsSaved && location === '/movies'
                ? `${cardClass} card__btn_saved`
                : cardClass
            }
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
