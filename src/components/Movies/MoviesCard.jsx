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
}) {
  let location = useLocation(); // переменная для useLocation

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
            className={
              isSavedLocation() ? 'card__btn card__btn_inSaved' : 'card__btn'
            }
          ></button>
        </div>
      </div>
      <div className="card__body">
        <img
          src={image}
          alt={`Постер фильма: ${nameRU}`}
          className="card__img"
        />
      </div>
    </li>
  );
}

export default MoviesCard;
