import MoviesCard from '../Movies/MoviesCard';
import SearchForm from '../Movies/SearchForm';

function SavedMovies() {
  return (
    <main className='body__main'>
      <SearchForm />
      <section className="cards">
        <ul className="cards__list">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </ul>
      </section>
    </main>
  );
}

export default SavedMovies;
