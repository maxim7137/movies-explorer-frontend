import Preloader from '../Preloader/Preloader';
import MoviesCard from './MoviesCard';

function MoviesCardList({ foundMovies, searching, isFound }) {
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
            {foundMovies[0] ? (
              <button className="more__btn">Ещё</button>
            ) : (
              isFound || false
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
