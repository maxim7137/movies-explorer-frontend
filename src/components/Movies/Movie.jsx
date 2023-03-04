import { useParams } from 'react-router-dom';
import getMovieByMovieId from '../../utils/getMovieByMovieId';

function Movie({ cardsBeatfilm }) {
  const { movieId } = useParams();
  const {
    country,
    director,
    duration,
    year,
    description,
    trailerLink,
    nameRU,
    nameEN,
    image,
  } = getMovieByMovieId(movieId, cardsBeatfilm);

  return (
    <section className="movie content">
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
          <p className="movie__column movie__value">{description}</p>
        </div>
      </div>
    </section>
  );
}

export default Movie;
