function get_idByMovieId(movieId, savedMovies) {
  return savedMovies.filter((card) => card.movieId === movieId)[0]._id;
}

export default get_idByMovieId;
