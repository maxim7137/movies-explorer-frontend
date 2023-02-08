import image from '../../images/card.jpg';
import { useLocation } from 'react-router-dom';

function MoviesCard() {
  let location = useLocation(); // переменная для useLocation

  // проверка useLocation
  function isSavedLocation() {
    return location.pathname === '/saved-movies';
  }

  return (
    <li className="card">
      <div className="card__head">
        <div className="card__text">
          <p className="card__name">33 слова о дизайне</p>
          <p className="card__duration">1ч 47м</p>
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
        <img src={image} alt="Постер фильма" className="card__img" />
      </div>
    </li>
  );
}

export default MoviesCard;
