import { useParams, useHistory } from 'react-router-dom';
import getMovieByMovieId from '../../utils/getMovieByMovieId';

function Movie({ cardsBeatfilm }) {
  let { movieId } = useParams();

  const {
    country,
    director,
    duration,
    year,
    description,
    nameRU,
    nameEN,
    image,
  } = getMovieByMovieId(movieId, cardsBeatfilm);

  let history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <section className="movie content">
      <div className="movie__container">
        <h1 className="movie__title">{nameRU}</h1>
        <p className="movie__subtitle">{nameEN}</p>
        <div className="movie__poster">
          <img className="movie__image" alt="Постер" src={image}></img>
        </div>
        <h2 className="movie__about">О фильме</h2>
        <div className="movie__table">
          <div className="movie__row">
            <p className="movie__column movie__key">Год</p>
            <p className="movie__column movie__value">{year}</p>
          </div>
          <div className="movie__row">
            <p className="movie__column movie__key">Страна</p>
            <p className="movie__column movie__value">{country}</p>
          </div>
          <div className="movie__row">
            <p className="movie__column movie__key">Режиссер</p>
            <p className="movie__column movie__value">{director}</p>
          </div>
          <div className="movie__row">
            <p className="movie__column movie__key">Время</p>
            <p className="movie__column movie__value">{duration} мин.</p>
          </div>
          <div className="movie__row">
            <p className="movie__column movie__key">Описание</p>
            <p className="movie__column movie__value movie__value_description">
              {description}
            </p>
          </div>
        </div>
        <button className="movie__back" onClick={handleClick}>
          ⬅ Назад
        </button>
      </div>
    </section>
  );
}

export default Movie;
