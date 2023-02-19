import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import MoviesCard from './MoviesCard';

function MoviesCardList({ foundMovies, searching, isFound }) {
  const [displayedArray, setDisplayedArray] = useState(foundMovies);
  const [cardQuantity, setCardQuantity] = useState(12);
  const [supplement, setSupplement] = useState(3);
  const [cardHeight, setCardHeight] = useState(320);

  function moreHandler(e) {
    setCardQuantity(cardQuantity + supplement);
    setTimeout(() => {
      window.scrollBy({
        top: cardHeight,
        behavior: 'smooth',
      });
    }, 1);
  }

  useEffect(() => {
    setDisplayedArray(foundMovies.slice(0, cardQuantity));
  }, [cardQuantity, foundMovies]);

  return (
    <section className="cards">
      {searching ? (
        <Preloader />
      ) : (
        <>
          <ul className="cards__list">
            {displayedArray.map((card) => (
              <MoviesCard key={card.movieId} card={card} {...card} />
            ))}
          </ul>
          <div className="more">
            {foundMovies.length > 3 ? (
              <button className="more__btn" onClick={moreHandler}>
                Ещё
              </button>
            ) : (
              isFound || false
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
