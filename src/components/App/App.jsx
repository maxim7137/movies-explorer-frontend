import { useState, useEffect, useCallback, memo, useRef } from 'react'; // реакт
import { Switch, Route, Redirect, useLocation, Link } from 'react-router-dom'; // реакт роутер

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

import { FOUND_SEARCH_ERROR } from '../../constants/constants'; // константы
import MoviesApi from '../../utils/MoviesApi'; // апи к публичному апи фильмам
import MainApi from '../../utils/MainApi'; // мое апи
import { Signin, Signup, getToken } from '../../utils/Auth'; // утилиты авторизации
import SearchMovies from '../../utils/SearchMovies'; // поиск фильмов
import NormCard from '../../utils/NormCard'; // функция для создания карточки для моего апи
import CurrentUserContext from '../../contexts/CurrentUserContext'; // контекст текущего пользователя
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; // защищенный роут

function App() {
  let location = useLocation(); // переменная для useLocation
  const [currentUser, setCurrentUser] = useState({}); // Контекст текущего пользователя
  const [loggedIn, setLoggedIn] = useState(false); // вошел не вошел
  const [loading, setLoading] = useState(true); // загружается не загружается
  const [serverErrorMessage, setServerErrorMessage] = useState(null); // сообщение об ошибке с сервера
  // < -- данные пользователя для авторизации
  const [userAuthData, setUserAuthData] = useState({
    password: '',
    email: '',
  });
  // -- данные пользователя для авторизации -- />

  // < -- Стейты для movies ------------------------------------------------------
  const [cardsBeatfilm, setCardsBeatfilm] = useState([]); // все начальные карточки
  const [foundMovies, setFoundMovies] = useState([]); // найденные карточки из локального хранилища
  const [savedMovies, setSavedMovies] = useState([]); // найденные карточки из моего апи
  const [filteredMovies, setFilteredMovies] = useState(savedMovies); // фильтрованные карточки из моего апи
  const [searching, setSearching] = useState(false); // загружается не загружается
  const [isFound, setIsFound] = useState(false); // загружается не загружается
  //  -- Стейты для movies ----------------------------------------------------- />

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
    setCardsBeatfilm([]);
    setFoundMovies([]);
    setSavedMovies([]);
    localStorage.clear();
    setUserAuthData({
      password: '',
      email: '',
    });
    setLoggedIn(false);
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

  // < -- Проверка токена ----------------------
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
  // -- Проверка токена --------------- />

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

  // < -- КАРТОЧКИ --
  // <-- Функция загрузки всех фильмов --
  async function loadAllMovies() {
    try {
      setSearching(true);
      const rowArray = await MoviesApi.getInitialCards();
      const normArray = rowArray.map((rowCard) => NormCard(rowCard));
      setCardsBeatfilm(normArray);
      return normArray;
    } catch (error) {
      setIsFound(FOUND_SEARCH_ERROR);
      console.log(error);
    } finally {
      setSearching(false);
    }
  }
  // -- Функция загрузки всех фильмов -- />

  // <-- Функция загрузки сохраненных фильмов --
  const loadSavedMovies = useCallback(async () => {
    try {
      setSearching(true);
      const jwt = 'Bearer ' + localStorage.getItem('jwt');
      const savedArray = await MainApi.getCards(jwt);
      setSavedMovies(savedArray);
      return savedArray;
    } catch (error) {
      setIsFound(FOUND_SEARCH_ERROR);
      console.log(error);
    } finally {
      setSearching(false);
    }
  }, []);
  // -- Функция загрузки сохраненных фильмов -- />

  // <-- Функция сохранения карточки --
  const addCard = useCallback(
    async (data) => {
      try {
        const jwt = 'Bearer ' + localStorage.getItem('jwt');
        const addedCard = await MainApi.setCard(data, jwt);
        setSavedMovies(savedMovies.concat(addedCard));
        return addedCard;
      } catch (error) {
        console.log(error);
      }
    },
    [savedMovies]
  );
  // -- Функция сохранения карточки -- />

  // <-- Функция удаления карточки --
  const delCard = useCallback(async (_id, movieId) => {
    try {
      const jwt = 'Bearer ' + localStorage.getItem('jwt');
      const deletedCard = await MainApi.delCard(_id, jwt);
      setSavedMovies((state) =>
        state.filter((stateCard) => stateCard.movieId !== movieId)
      );
      return deletedCard;
    } catch (error) {
      console.log(error);
    }
  }, []);
  // -- Функция удаления карточки -- />

  // <-- Обработчика сабмита поиска --
  const handleSearch = useCallback(
    (inputData, shortChecked) => {
      loadAllMovies();
      const foundMoviesNow = SearchMovies(
        inputData,
        shortChecked,
        cardsBeatfilm
      );
      setFoundMovies(foundMoviesNow);
      localStorage.setItem('moviesListState', JSON.stringify(foundMoviesNow));
      setIsFound(!foundMoviesNow[0] ? 'Ничего не найдено' : false);
    },
    [cardsBeatfilm]
  );
  // -- Обработчика сабмита поиска -- />

  // <-- Обработчика сабмита поиска сохраненных фильмов --
  const handleSavedSearch = useCallback(
    (inputData, shortChecked) => {
      const foundMoviesNow = SearchMovies(inputData, shortChecked, savedMovies);
      inputData === '' || inputData === ' '
        ? setFilteredMovies(savedMovies)
        : setFilteredMovies(foundMoviesNow);
    },
    [savedMovies]
  );
  // -- Обработчика сабмита поиска сохраненных фильмов -- />

  // изменяем фильтрованный массив вслед за сохраненным
  useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [savedMovies]);

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
              addCard={addCard}
              delCard={delCard}
              loggedIn={loggedIn}
              foundMovies={foundMovies}
              setFoundMovies={setFoundMovies}
              cardsBeatfilm={cardsBeatfilm}
              setCardsBeatfilm={setCardsBeatfilm}
              loadAllMovies={loadAllMovies}
              loadSavedMovies={loadSavedMovies}
              isFound={isFound}
              setIsFound={setIsFound}
              handleSearch={handleSearch}
              searching={searching}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              foundMovies={foundMovies}
              loadSavedMovies={loadSavedMovies}
              delCard={delCard}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              handleSavedSearch={handleSavedSearch}
              filteredMovies={filteredMovies}
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
