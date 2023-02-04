import arrow from '../../images/arrow.svg'

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <p className="portfolio__title">Портфолио</p>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              href="https://maxim7137.github.io/how-to-learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="portfolio__text">Статичный сайт</span>
              <span className="portfolio__arrow">
                <img
                  className="portfolio__img"
                  src={arrow}
                  alt="стрелка"
                />
              </span>
            </a>
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              href="https://maxim7137.github.io/russian-travel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="portfolio__text">Адаптивный сайт</span>
              <span className="portfolio__arrow">
                <img
                  className="portfolio__img"
                  src={arrow}
                  alt="стрелка"
                />
              </span>
            </a>
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              href="https://maxim.nomoredomains.club"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="portfolio__text">Одностраничное приложение</span>
              <span className="portfolio__arrow">
                <img
                  className="portfolio__img"
                  src={arrow}
                  alt="стрелка"
                />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
