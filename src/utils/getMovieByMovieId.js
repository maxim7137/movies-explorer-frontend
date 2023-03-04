function getMovieByMovieId(id, array) {
  return array.filter((element) => element.movieId === id / 1)[0];
}

export default getMovieByMovieId;
