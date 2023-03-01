function getOurMovies(userId, moviesArray) {
  return moviesArray.filter((card) => card.owner === userId);
}

export default getOurMovies;
