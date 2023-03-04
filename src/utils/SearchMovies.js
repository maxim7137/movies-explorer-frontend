function SearchMovies(inputData, shortChecked, cardsArray) {
  // поиск в объекте (если хоть в одном ключе (кроме описания, ссылок, длительности и id) есть искомое значение значит этот объект нам подходит)
  function filterItemsObject(el, query) {
    let result = false;
    const {
      description,
      duration,
      image,
      movieId,
      thumbnail,
      trailerLink,
      ...rest
    } = el;
    
    for (let key in rest) {
      if (
        el[key]
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) !== -1
      ) {
        result = true;
      }
    }
    return result;
  }

  function filterItemsArray(arr, query) {
    return arr.filter((el) => filterItemsObject(el, query));
  }

  let foundArray;

  if (shortChecked) {
    foundArray = cardsArray.filter((e) => e.duration <= 40);
  } else {
    foundArray = cardsArray;
  }

  const finalArray = filterItemsArray(foundArray, inputData);

  if (inputData.toLowerCase() === 'ключевое слово') {
    return foundArray;
  } else {
    return finalArray;
  }
}

export default SearchMovies;

/*
// поиск в объекте (только по nameRu - для ревью)
function filterItemsObject(el, query) {
  return (
    el.nameRU
      .toString()
      .toLowerCase()
      .indexOf(query.toString().toLowerCase()) !== -1
  );
}
 */
