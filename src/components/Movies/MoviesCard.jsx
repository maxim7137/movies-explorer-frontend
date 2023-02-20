import { useLocation } from 'react-router-dom';
import MinToHours from '../../utils/MinToHours';

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
  addCard,
}) {
  let location = useLocation(); // переменная для useLocation

  function handleSave() {
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

  // проверка useLocation
  function isSavedLocation() {
    return location.pathname === '/saved-movies';
  }

  return (
    <li className="card">
      <div className="card__head">
        <div className="card__text">
          <p className="card__name">{nameRU}</p>
          <p className="card__duration">{MinToHours(duration)}</p>
        </div>
        <div className="card__save">
          <button
            onClick={handleSave}
            className={
              isSavedLocation() ? 'card__btn card__btn_inSaved' : 'card__btn'
            }
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
