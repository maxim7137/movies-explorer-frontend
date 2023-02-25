import { useEffect } from 'react';

import SearchForm from '../Movies/SearchForm'; // jsx
import MoviesCardList from '../Movies/MoviesCardList'; // jsx
import MovieDialog from '../Dialogs/MovieDialog'; // jsx

function SavedMovies({
  handleSavedSearch,
  foundMovies,
  searching,
  loadSavedMovies,
  delCard,
  savedMovies,
  filteredMovies,
  isDeletedCard,
  setIsDeletedCard,
}) {
  useEffect(() => {
    localStorage.removeItem('potentialUserEmail');
    loadSavedMovies();
  }, [loadSavedMovies]);

  return (
    <main className="body__main content">
      <SearchForm handleSearch={handleSavedSearch} />
      <MoviesCardList
        foundMovies={foundMovies}
        searching={searching}
        isFound={false}
        delCard={delCard}
        savedMovies={savedMovies}
        filteredMovies={filteredMovies}
      />
      <MovieDialog
        isDeletedCard={isDeletedCard}
        setIsDeletedCard={setIsDeletedCard}
      />
    </main>
  );
}

export default SavedMovies;
