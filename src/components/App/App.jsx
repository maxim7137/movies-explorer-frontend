// import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { useState } from 'react';

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
      <Header loggedIn={loggedIn} logIn={logIn} logOut={logOut} />
      <Main />
      <Movies />
      <SavedMovies />
      <Footer />
    </>
  );
}

export default App;
