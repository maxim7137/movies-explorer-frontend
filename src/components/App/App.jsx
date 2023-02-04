// import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { useState } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
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
      <Footer />
    </>
  );
}

export default App;
