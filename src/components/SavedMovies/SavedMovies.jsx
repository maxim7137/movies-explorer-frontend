import { useEffect } from 'react';
import MoviesCard from '../Movies/MoviesCard';
import SearchForm from '../Movies/SearchForm';

function SavedMovies() {
  useEffect(() => {
    localStorage.removeItem('potentialUserEmail');
  }, []);

  return (
    <main className="body__main content">
      <SearchForm />
      <section className="cards">
        <ul className="cards__list"></ul>
      </section>
    </main>
  );
}

export default SavedMovies;
