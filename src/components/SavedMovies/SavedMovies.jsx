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
  shortChecked,
  setShortChecked,
}) {
  useEffect(() => {
    localStorage.removeItem('potentialUserEmail');
    setShortChecked(false);
    loadSavedMovies();
  }, [loadSavedMovies, setShortChecked]);

  return (
    <main className="body__main content">
      <SearchForm
        handleSearch={handleSavedSearch}
        shortChecked={shortChecked}
        setShortChecked={setShortChecked}
      />
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
