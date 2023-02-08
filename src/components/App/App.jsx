import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Switch, Route, Redirect, useLocation, Link } from 'react-router-dom';

import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Preloader from '../Preloader/Preloader';

import Header from '../Header/Header';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import Footer from '../Footer/Footer';

function App() {
  let location = useLocation(); // переменная для useLocation

  const [loggedIn, setLoggedIn] = useState(false); // вошел не вошел

  // войти
  function logIn(event) {
    event.preventDefault();
    setLoggedIn(true);
  }

  // выйти
  function logOut(event) {
    event.preventDefault();
    setLoggedIn(false);
  }

  // проверка useLocation
  function isHeaderLocation() {
    return (
      location.pathname === '/' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies' ||
      location.pathname === '/profile'
    );
  }

  function isFooterLocation() {
    return (
      location.pathname === '/' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies'
    );
  }

  return (
    <>
      {isHeaderLocation() && <Header loggedIn={loggedIn} />}
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile logOut={logOut} />
        </Route>
        <Route path="/signin">
          <Login logIn={logIn} />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Route path="*">
          {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
        </Route>
      </Switch>
      {isFooterLocation() && <Footer />}
    </>
  );
}

export default App;
