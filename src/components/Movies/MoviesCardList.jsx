import Preloader from '../Preloader/Preloader';
import MoviesCard from './MoviesCard';

function MoviesCardList({ foundMovies, searching }) {
  return (
    <section className="cards">
      {searching ? (
        <Preloader />
      ) : (
        <>
          <ul className="cards__list">
            {foundMovies.map((card) => (
              <MoviesCard key={card.movieId} card={card} {...card} />
            ))}
          </ul>
          <div className="more">
            <button className="more__btn">Ещё</button>
          </div>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
