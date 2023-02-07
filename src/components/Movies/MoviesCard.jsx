import image from '../../images/card.jpg'


function MoviesCard() {
  return (
    <li className="card">
      <div className="card__head">
        <div className="card__text">
          <p className="card__name">33 слова о дизайне</p>
          <p className="card__duration">1ч 47м</p>
        </div>
        <div className="card__save">
          <button className="card__btn"></button>
        </div>
      </div>
      <div className="card__body">
        <img
          src={image}
          alt="Постер фильма"
          className="card__img"
        />
      </div>
    </li>
  );
}

export default MoviesCard;
