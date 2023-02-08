import MoviesCard from '../Movies/MoviesCard';
import SearchForm from '../Movies/SearchForm';

function SavedMovies() {
  return (
    <>
      <SearchForm />
      <section className="cards">
        <ul className="cards__list">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </ul>
      </section>
    </>
  );
}

export default SavedMovies;
