function isSavedCard(savedMovies, movieId) {
  let movieIdArray = [];
  savedMovies.forEach((element) => {
    movieIdArray.push(element.movieId);
  });
  return movieIdArray.includes(movieId);
}

export default isSavedCard;
