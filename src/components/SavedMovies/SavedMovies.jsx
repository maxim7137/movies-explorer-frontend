import { useEffect } from 'react';

import SearchForm from '../Movies/SearchForm'; // jsx
import MoviesCardList from '../Movies/MoviesCardList'; // jsx

function SavedMovies({
  handleSavedSearch,
  foundMovies,
  searching,
  loadSavedMovies,
  delCard,
  savedMovies,
  setSavedMovies,
}) {
  useEffect(() => {
    localStorage.removeItem('potentialUserEmail');
    loadSavedMovies();
  }, []);

  return (
    <main className="body__main content">
      <SearchForm handleSearch={handleSavedSearch} />
      <MoviesCardList
        foundMovies={foundMovies}
        searching={searching}
        isFound={false}
        delCard={delCard}
        savedMovies={savedMovies}
        setSavedMovies={setSavedMovies}
      />
    </main>
  );
}

export default SavedMovies;
