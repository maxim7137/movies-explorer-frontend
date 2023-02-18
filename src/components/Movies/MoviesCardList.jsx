import MoviesCard from './MoviesCard';

function MoviesCardList({ foundMovies }) {
  return (
    <section className="cards">
      <ul className="cards__list">
        {foundMovies.map((card) => (
          <MoviesCard key={card.movieId} card={card} {...card} />
        ))}
      </ul>
      <div className="more">
        <button className="more__btn">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;
