import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
