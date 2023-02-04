function NavTab() {
  return (
    <nav className="promo__nav navtab">
      <ul className="navtab__list">
        <li className="navtab__item">
          <a className="navtab__link" href="#about">
            О проекте
          </a>
        </li>
        <li className="navtab__item">
          <a className="navtab__link" href="#techs">
            Технологии
          </a>
        </li>
        <li className="navtab__item">
          <a className="navtab__link" href="#me">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
