import { useState, useEffect, useCallback, memo, useRef } from 'react';

import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

import Header from '../Header/Header';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import Footer from '../Footer/Footer';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  function logIn() {
    setLoggedIn(true);
  }
  function logOut() {
    setLoggedIn(false);
  }

  return (
    <>
      {/* <Header loggedIn={loggedIn} logIn={logIn} logOut={logOut} />
      <Footer /> */}
      <NotFound></NotFound>
    </>
  );
}

export default App;
