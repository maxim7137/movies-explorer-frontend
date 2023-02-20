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
  function isInSavedLocationCLass() {
    if (location.pathname === '/saved-movies') {
      return 'card__btn card__btn_inSaved';
    } else {
      return 'card__btn';
    }
  }

  function handleClick(params) {}

  return (
    <li className="card">
      <div className="card__head">
        <div className="card__text">
          <p className="card__name">{nameRU}</p>
          <p className="card__duration">{MinToHours(duration)}</p>
        </div>
        <div className="card__save">
          <button
            className={isInSavedLocationCLass()}
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
