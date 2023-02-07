import MoviesCard from '../Movies/MoviesCard';

function SavedMovies() {
  return (
    <section className="cards">
      <ul className="cards__list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
    </section>
  );
}

export default SavedMovies;