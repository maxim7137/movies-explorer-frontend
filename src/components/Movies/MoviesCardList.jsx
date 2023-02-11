import MoviesCard from './MoviesCard';

function MoviesCardList() {
  return (
    <section className="cards">
      <ul className="cards__list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <div className="more">
        <button className="more__btn">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;
