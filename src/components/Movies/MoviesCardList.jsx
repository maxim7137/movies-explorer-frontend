import { useEffect, useState } from 'react';
import useWindowSize from '../../utils/useWindowSize';
import Preloader from '../Preloader/Preloader';
import MoviesCard from './MoviesCard';

function MoviesCardList({ foundMovies, searching, isFound, addCard }) {
  const [displayedArray, setDisplayedArray] = useState(foundMovies);
  const [cardQuantity, setCardQuantity] = useState(12);
  const [supplement, setSupplement] = useState(3);
  const [cardHeight, setCardHeight] = useState(320);

  const size = useWindowSize().width;

  useEffect(() => {
    if (size > 1584) {
      setCardQuantity(16);
      setSupplement(4);
      setCardHeight(320);
    } else if (size > 1024 && size <= 1584) {
      setCardQuantity(12);
      setSupplement(3);
      setCardHeight(320);
    } else if (size > 480 && size <= 1024) {
      setCardQuantity(8);
      setSupplement(2);
      setCardHeight(305);
    } else if (size <= 480) {
      setCardQuantity(5);
      setSupplement(2);
      setCardHeight(620);
    }
  }, [size]);

  useEffect(() => {
    setDisplayedArray(foundMovies.slice(0, cardQuantity));
  }, [cardQuantity, foundMovies]);

  function moreHandler() {
    setCardQuantity(cardQuantity + supplement);
    setTimeout(() => {
      window.scrollBy({
        top: cardHeight,
        behavior: 'smooth',
      });
    }, 100);
  }

  return (
    <section className="cards">
      {searching ? (
        <Preloader />
      ) : (
        <>
          <ul className="cards__list">
            {displayedArray.map((card) => (
              <MoviesCard key={card.movieId} card={card} {...card} addCard={addCard}/>
            ))}
          </ul>
          <div className="more">
            {foundMovies.length > displayedArray.length ? (
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
