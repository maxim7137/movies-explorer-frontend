import { useEffect } from 'react';

import SearchForm from '../Movies/SearchForm';
// import MoviesCardList from '../Movies/MoviesCardList';
import MoviesCard from '../Movies/MoviesCard';

function SavedMovies() {
  useEffect(() => {
    localStorage.removeItem('potentialUserEmail');
  }, []);

  return (
    <main className="body__main content">
      <SearchForm />
      {/* <MoviesCardList /> */}
    </main>
  );
}

export default SavedMovies;
