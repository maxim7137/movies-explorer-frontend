import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navigation({ loggedIn }) {
  const [burger, setBurger] = useState(false); // меню бургер да нет
  // переключение меню бургер
  function burgerClick() {
    if (burger) {
      setBurger(false);
    } else {
      setBurger(true);
    }
  }
  // закрытие меню бургер
  function closeSideMenu(evt) {
    if (evt.target.classList.contains('navigation__item')) {
      evt.preventDefault();
      setBurger(false);
    }
  }

  return (
    <>
      {loggedIn ? (
        <>
          {/* Залогиненный пользователь -- */}
          {/* Кнопка -- */}
          <button
            className={burger ? 'burger burger_active' : 'burger'}
            onClick={burgerClick}
          >
            <span
              className={
                burger ? 'burger__line burger__line_active' : 'burger__line'
              }
            ></span>
          </button>
          {/* -- Кнопка */}
          <nav
            className={
              burger
                ? 'navigation navigation_login navigation_active'
                : 'navigation navigation_login'
            }
          >
            <ul
              className="navigation__list navigation__list_login"
              onClick={closeSideMenu}
            >
              <li>
                <NavLink
                  exact
                  to="/"
                  activeClassName="navigation__item_selected"
                  className="navigation__item navigation__item_side"
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/movies"
                  activeClassName="navigation__item_selected"
                  className="navigation__item navigation__item_side"
                >
                  Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="saved-movies"
                  activeClassName="navigation__item_selected"
                  className="navigation__item navigation__item_side"
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className="navigation__item navigation__item_account"
                >
                  Аккаунт
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* -- Залогиненный пользователь */}
        </>
      ) : (
        <>
          {/* Неавторизованный пользователь -- */}
          <nav className="navigation">
            <ul className="navigation__list">
              <li>
                <Link
                  to="/signup"
                  className="navigation__item navigation__item_signup"
                >
                  Регистрация
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  className="navigation__item navigation__item_signin"
                >
                  Войти
                </Link>
              </li>
            </ul>
          </nav>
          {/* --Неавторизованный пользователь */}
        </>
      )}
    </>
  );
}

export default Navigation;
