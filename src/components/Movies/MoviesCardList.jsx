import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowSize from '../../utils/useWindowSize';
import Preloader from '../Preloader/Preloader';
import MoviesCard from './MoviesCard';

import {
  MOVIES_CARD_CLASS,
  MOVIES_CARD_CLASS_IN_SAVED,
  WIDE_SCREEN,
  MEDIUM_SCREEN,
  SMALL_SCREEN,
  WIDE_SCREEN_CARDS,
  MEDIUM_SCREEN_CARDS,
  SMALL_SCREEN_CARDS,
  EX_SMALL_SCREEN_CARDS,
  WIDE_SCREEN_SUPPLEMENT,
  MEDIUM_SCREEN_SUPPLEMENT,
  SMALL_SCREEN_SUPPLEMENT,
  WIDE_SCREEN_SCROLL,
  SMALL_SCREEN_SCROLL,
  EX_SMALL_SCREEN_SCROLL,
} from '../../constants/constants';

function MoviesCardList({
  foundMovies,
  searching,
  isFound,
  savedMovies,
  addCard,
  delCard,
  filteredMovies,
}) {
  let location = useLocation().pathname;
  const [displayedArray, setDisplayedArray] = useState(foundMovies);
  const [cardQuantity, setCardQuantity] = useState(12);
  const [supplement, setSupplement] = useState(3);
  const [cardHeight, setCardHeight] = useState(320);

  const size = useWindowSize().width;

  useEffect(() => {
    if (size > WIDE_SCREEN) {
      setCardQuantity(WIDE_SCREEN_CARDS);
      setSupplement(WIDE_SCREEN_SUPPLEMENT);
      setCardHeight(WIDE_SCREEN_SCROLL);
    } else if (size > MEDIUM_SCREEN && size <= WIDE_SCREEN) {
      setCardQuantity(MEDIUM_SCREEN_CARDS);
      setSupplement(MEDIUM_SCREEN_SUPPLEMENT);
      setCardHeight(WIDE_SCREEN_SCROLL);
    } else if (size > SMALL_SCREEN && size <= MEDIUM_SCREEN) {
      setCardQuantity(SMALL_SCREEN_CARDS);
      setSupplement(SMALL_SCREEN_SUPPLEMENT);
      setCardHeight(SMALL_SCREEN_SCROLL);
    } else if (size <= SMALL_SCREEN) {
      setCardQuantity(EX_SMALL_SCREEN_CARDS);
      setSupplement(SMALL_SCREEN_SUPPLEMENT);
      setCardHeight(EX_SMALL_SCREEN_SCROLL);
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
  // загружается ? прелоадер : карточки
  // фильмы ? фильмы из стороннего апи (найдено больше чем нарисовано ? покажи кнопку : убери кнопку) : фильмы из нашего апи
  return (
    <section className="cards">
      {searching ? (
        <Preloader />
      ) : (
        <>
          {location === '/movies' ? (
            <>
              <ul className="cards__list">
                {displayedArray.map((card) => (
                  <MoviesCard
                    key={card.movieId}
                    cardClass={MOVIES_CARD_CLASS}
                    card={card}
                    {...card}
                    addCard={addCard}
                    delCard={delCard}
                    savedMovies={savedMovies}
                  />
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
          ) : (
            <ul className="cards__list">
              {filteredMovies.map((card) => (
                <MoviesCard
                  key={card.movieId}
                  cardClass={MOVIES_CARD_CLASS_IN_SAVED}
                  card={card}
                  {...card}
                  delCard={delCard}
                  savedMovies={savedMovies}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
