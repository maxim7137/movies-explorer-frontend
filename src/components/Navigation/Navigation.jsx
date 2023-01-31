import { useState } from 'react';

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
          <nav className="navigation navigation_login">
            <ul className="navigation__list navigation__list_login">
              <li>
                <a className="navigation__item" href="#">
                  Фильмы
                </a>
              </li>
              <li>
                <a className="navigation__item" href="#">
                  Сохраненные фильмы
                </a>
              </li>
              <li>
                <a
                  className="navigation__item navigation__item_acount"
                  href="#"
                >
                  Аккаунт
                </a>
              </li>
            </ul>
          </nav>
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
          {/* max-width: 768px -- */}
          <nav
            className={
              burger
                ? 'navigation navigation_fixed navigation_active'
                : 'navigation navigation_fixed'
            }
          >
            <ul
              className="navigation__list navigation__list_login"
              onClick={closeSideMenu}
            >
              <li>
                <a className="navigation__item" href="#">
                  Главная
                </a>
              </li>
              <li>
                <a className="navigation__item" href="#">
                  Фильмы
                </a>
              </li>
              <li>
                <a className="navigation__item" href="#">
                  Сохраненные фильмы
                </a>
              </li>
              <li>
                <a
                  className="navigation__item navigation__item_acount"
                  href="#"
                >
                  Аккаунт
                </a>
              </li>
            </ul>
          </nav>
          {/* -- max-width: 768px */}
          {/* -- Залогиненный пользователь */}
        </>
      ) : (
        <nav className="navigation">
          <ul className="navigation__list">
            <li>
              <a className="navigation__item navigation__item_signup" href="#">
                Регистрация
              </a>
            </li>
            <li>
              <a className="navigation__item navigation__item_signin" href="#">
                Войти
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navigation;
