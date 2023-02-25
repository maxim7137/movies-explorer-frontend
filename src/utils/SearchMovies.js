function SearchMovies(inputData, shortChecked, cardsArray) {
  // поиск в объекте (если хоть в одном ключе есть искомое значение значит этот объект нам подходит)
  function filterItemsObject(el, query) {
    let result = false;
    for (let key in el) {
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
