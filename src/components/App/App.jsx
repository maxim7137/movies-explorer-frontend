import { useState, useEffect, useCallback, memo, useRef } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <Footer />
    </>
  );
}

export default App;
