import { useState, useEffect, useCallback, memo, useRef } from 'react'; // реакт
import { Switch, Route, Redirect, useLocation, Link } from 'react-router-dom'; // реакт роутер

import { Signin, Signup, getToken } from '../../utils/Auth'; // утилиты
import MainApi from '../../utils/MainApi'; // мое апи

import CurrentUserContext from '../../contexts/CurrentUserContext'; // контекст текущего пользователя

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; // защищенный роут

// <-- jsx компоненты
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

// -- jsx компоненты --/>

function App() {
  let location = useLocation(); // переменная для useLocation

  const [loggedIn, setLoggedIn] = useState(false); // вошел не вошел
  const [loading, setLoading] = useState(true); // загружается не загружается
  const [serverErrorMessage, setServerErrorMessage] = useState(null); // загружается не загружается

  // < -- данные пользователя для авторизации
  const [userAuthData, setUserAuthData] = useState({
    password: '',
    email: '',
  });
  // -- данные пользователя для авторизации -- />

  const [currentUser, setCurrentUser] = useState({}); // Контекст текущего пользователя

  // <-- Пользователь
  useEffect(() => {
    if (loggedIn) {
      const jwt = 'Bearer ' + localStorage.getItem('jwt');
      MainApi.getInitialUser(jwt)
        .then((result) => {
          setCurrentUser(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);
  // Пользователь -- />

  // <-- Обработчик аутентификации
  const authentication = useCallback((data) => {
    localStorage.setItem('jwt', data.token);
    setLoggedIn(true);
    setUserAuthData(data.user);
  }, []);
  // Обработчик аутентификации -->

  // <-- Обработчики входа и выхода
  const handleLogin = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        const data = await Signin(email, password);
        if (data.token) {
          authentication(data);
        }
        setUserAuthData({
          password,
          email,
        });
      } catch (error) {
        const { message } = await error;
        if (message === 'Validation failed') {
          const { validation } = await error;
          const validationMessage = validation.body.message;
          setServerErrorMessage(validationMessage);
        } else {
          setServerErrorMessage(message);
        }
      } finally {
        setLoading(false);
      }
    },
    [authentication]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserAuthData({
      password: '',
      email: '',
    });
  }, []);
  // Обработчики входа и выхода -->

  // <-- Обработчик регистрации
  const handleRegister = useCallback(
    async (name, email, password) => {
      try {
        setLoading(true);
        const data = await Signup(name, email, password);
        if (data.token) {
          authentication(data);
        }
        handleLogin(email, password);
      } catch (error) {
        const { message } = await error;
        if (message === 'Validation failed') {
          const { validation } = await error;
          const validationMessage = validation.body.message;
          setServerErrorMessage(validationMessage);
        } else {
          setServerErrorMessage(message);
        }
      } finally {
        setLoading(false);
      }
    },
    [authentication, handleLogin]
  );
  // Обработчик регистрации -->

  // <-- Обработчик обновления профиля
  function handleUpdateUser(data) {
    const jwt = 'Bearer ' + localStorage.getItem('jwt');
    MainApi.setUser(data, jwt)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((error) => {
        return error;
      })
      .then((error) => {
        if (error) {
          const { message } = error;
          if (message === 'Validation failed') {
            const { validation } = error;
            const validationMessage = validation.body.message;
            setServerErrorMessage(validationMessage);
          } else {
            setServerErrorMessage(message);
          }
        }
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });
  }
  // Обработчик обновления профиля -- />

  // Проверка токена
  const tokenCheck = useCallback(async () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    try {
      setLoading(true);
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('no token');
      }
      if (jwt) {
        const user = await getToken(jwt);
        if (!user) {
          throw new Error('no user');
        }
        if (user) {
          setUserAuthData(user);
          setLoggedIn(true);
        }
      }
    } catch (error) {
      // console.log('tokenCheck', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // настало время проверить токен
    tokenCheck();
  }, [tokenCheck]);

  // <-- проверка useLocation
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
  // -- проверка useLocation -- />

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {loading ? (
        <Preloader />
      ) : (
        <>
          {isHeaderLocation() && <Header loggedIn={loggedIn} />}
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <ProtectedRoute
              path="/movies"
              component={Movies}
              loggedIn={loggedIn}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              handleLogout={handleLogout}
              handleUpdateUser={handleUpdateUser}
              serverErrorMessage={serverErrorMessage}
              setServerErrorMessage={setServerErrorMessage}
            />

            <Route path="/signin">
              <Login
                handleLogin={handleLogin}
                loggedIn={loggedIn}
                serverErrorMessage={serverErrorMessage}
                setServerErrorMessage={setServerErrorMessage}
              />
            </Route>
            <Route path="/signup">
              <Register
                handleRegister={handleRegister}
                loggedIn={loggedIn}
                serverErrorMessage={serverErrorMessage}
                setServerErrorMessage={setServerErrorMessage}
              />
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
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
