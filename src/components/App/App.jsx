import { useState, useEffect, useCallback } from 'react'; // реакт
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useParams,
} from 'react-router-dom'; // реакт роутер

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
import Movie from '../Movies/Movie';
import Footer from '../Footer/Footer';
// -- jsx компоненты --/>

import { FOUND_SEARCH_ERROR } from '../../constants/constants'; // константы
import MoviesApi from '../../utils/MoviesApi'; // апи к публичному апи фильмам
import MainApi from '../../utils/MainApi'; // мое апи
import { Signin, Signup, getToken } from '../../utils/Auth'; // утилиты авторизации
import SearchMovies from '../../utils/SearchMovies'; // поиск фильмов
import NormCard from '../../utils/NormCard'; // функция для создания карточки для моего апи
import getOurMovies from '../../utils/getOurMovies'; // функция фильтрации фильмов для текущего пользователя
import CurrentUserContext from '../../contexts/CurrentUserContext'; // контекст текущего пользователя
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; // защищенный роут

function App() {
  let location = useLocation().pathname; // переменная для useLocation

  const params = useParams();
  const { movieId } = params;

  const [currentUser, setCurrentUser] = useState({}); // Контекст текущего пользователя
  const [loggedIn, setLoggedIn] = useState(false); // вошел не вошел
  const [loading, setLoading] = useState(true); // загружается не загружается
  const [isUpdateUserSuccessful, setIsUpdateUserSuccessful] = useState(false); // для показа сообщения об изменении профиля
  const [serverErrorMessage, setServerErrorMessage] = useState(''); // сообщение об ошибке с сервера
  const [isDeletedCard, setIsDeletedCard] = useState(false); // сообщение при удалении чужой карточки

  // < -- Стейты для movies ------------------------------------------------------
  const [cardsBeatfilm, setCardsBeatfilm] = useState(
    JSON.parse(localStorage.getItem('cardsBeatfilmStorage')) || []
  ); // все начальные карточки
  const [foundMovies, setFoundMovies] = useState([]); // найденные карточки из локального хранилища
  const [savedMovies, setSavedMovies] = useState([]); // найденные карточки из моего апи
  const [filteredMovies, setFilteredMovies] = useState(savedMovies); // фильтрованные карточки из моего апи
  const [searching, setSearching] = useState(false); // загружается не загружается
  const [isFound, setIsFound] = useState(false); // загружается не загружается
  const [shortChecked, setShortChecked] = useState(false); // состояние чек-бокса фильмов
  const [shortCheckedSaved, setShortCheckedSaved] = useState(false); // состояние чек-бокса сохраненных фильмов
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
  }, []);
  // Обработчик аутентификации -->

  // <-- Обработчики входа и выхода
  const handleLogin = useCallback(
    async (email, password, e) => {
      const { elements } = e.target;
      try {
        setLoading(true);
        const data = await Signin(email, password);
        if (data.token) {
          authentication(data);
        }
        for (let i = 0; i < elements.length; i++) {
          elements[i].setAttribute('disabled', '');
        }
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
        for (let i = 0; i < elements.length; i++) {
          elements[i].removeAttribute('disabled');
        }
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
    setLoggedIn(false);
    setShortChecked(false);
  }, []);
  // Обработчики входа и выхода -->

  // <-- Обработчик регистрации
  const handleRegister = useCallback(
    async (name, email, password, e) => {
      const { elements } = e.target;
      try {
        setLoading(true);
        const data = await Signup(name, email, password);
        if (data.token) {
          authentication(data);
        }
        for (let i = 0; i < elements.length; i++) {
          elements[i].setAttribute('disabled', '');
        }
        handleLogin(email, password, e);
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
        for (let i = 0; i < elements.length; i++) {
          elements[i].removeAttribute('disabled');
        }
        setLoading(false);
      }
    },
    [authentication, handleLogin]
  );
  // Обработчик регистрации -->

  // <-- Обработчик обновления профиля
  function handleUpdateUser(data, e) {
    const { elements } = e.target;
    const jwt = 'Bearer ' + localStorage.getItem('jwt');
    MainApi.setUser(data, jwt)
      .then((result) => {
        setCurrentUser(result);
        setIsUpdateUserSuccessful(true);
        setTimeout(() => {
          setIsUpdateUserSuccessful(false);
        }, 5000);
        for (let i = 0; i < elements.length; i++) {
          elements[i].setAttribute('disabled', '');
        }
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
      })
      .finally(() => {
        for (let i = 0; i < elements.length; i++) {
          elements[i].removeAttribute('disabled');
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
          setLoggedIn(true);
        }
      }
    } catch (error) {
      // console.log('tokenCheck', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // настало время проверить токен
  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);
  // -- Проверка токена --------------- />

  // <-- проверка useLocation
  function isHeaderLocation() {
    return (
      location === '/' ||
      location === '/movies' ||
      location === '/saved-movies' ||
      location === '/profile'
    );
  }
  function isFooterLocation() {
    return (
      location === '/' || location === '/movies' || location === '/saved-movies'
    );
  }
  // -- проверка useLocation -- />

  // < -- КАРТОЧКИ --
  // <-- Функция загрузки всех фильмов --
  async function loadAllMovies() {
    if (cardsBeatfilm.length < 100) {
      try {
        setSearching(true);
        const rowArray = await MoviesApi.getInitialCards();
        const normArray = rowArray.map((rowCard) => NormCard(rowCard));
        setCardsBeatfilm(normArray);
        localStorage.setItem('cardsBeatfilmStorage', JSON.stringify(normArray));
        return normArray;
      } catch (error) {
        setIsFound(FOUND_SEARCH_ERROR);
        console.log(error);
      } finally {
        setSearching(false);
      }
    }
  }
  // -- Функция загрузки всех фильмов -- />

  // <-- Функция загрузки сохраненных фильмов --
  const loadSavedMovies = useCallback(async () => {
    try {
      setSearching(true);
      let _id;
      const jwt = 'Bearer ' + localStorage.getItem('jwt');
      const savedArray = await MainApi.getCards(jwt);
      if (currentUser._id) {
        _id = currentUser._id;
      } else {
        const user = await MainApi.getInitialUser(jwt);
        _id = user._id;
      }
      const ourArray = getOurMovies(_id, savedArray);
      setSavedMovies(ourArray);
      return ourArray;
    } catch (error) {
      setIsFound(FOUND_SEARCH_ERROR);
      console.log(error);
    } finally {
      setSearching(false);
    }
  }, [currentUser._id]);
  // -- Функция загрузки сохраненных фильмов -- />

  // <-- Функция сохранения карточки --
  const addCard = useCallback(
    async (data, { target }) => {
      try {
        target.setAttribute('disabled', '');
        const jwt = 'Bearer ' + localStorage.getItem('jwt');
        const addedCard = await MainApi.setCard(data, jwt);
        if (addedCard) {
          setSavedMovies(savedMovies.concat(addedCard));
        }
        return addedCard;
      } catch (error) {
        const { message } = await error;
        setIsDeletedCard(message);
        setTimeout(() => {
          setIsDeletedCard(false);
        }, 8000);
        if (message === 'Необходима авторизация') {
          setTimeout(() => {
            handleLogout();
          }, 8001);
        }
      } finally {
        target.removeAttribute('disabled');
      }
    },
    [handleLogout, savedMovies]
  );
  // -- Функция сохранения карточки -- />

  // <-- Функция удаления карточки --
  const delCard = useCallback(
    async (_id, movieId, { target }) => {
      try {
        target.setAttribute('disabled', '');
        const jwt = 'Bearer ' + localStorage.getItem('jwt');
        const deletedCard = await MainApi.delCard(_id, jwt);
        setSavedMovies((state) =>
          state.filter((stateCard) => stateCard.movieId !== movieId)
        );
        return deletedCard;
      } catch (error) {
        const { message } = await error;
        setIsDeletedCard(message);
        setTimeout(() => {
          setIsDeletedCard(false);
        }, 8000);
        if (message === 'Необходима авторизация') {
          setTimeout(() => {
            handleLogout();
          }, 8001);
        }
      } finally {
        target.removeAttribute('disabled');
      }
    },
    [handleLogout]
  );
  // -- Функция удаления карточки -- />

  // <-- Обработчика сабмита поиска --
  const handleSearch = useCallback(
    (inputData, shortChecked) => {
      if (cardsBeatfilm.length < 100) {
        loadAllMovies();
      }
      const foundMoviesNow = SearchMovies(
        inputData,
        shortChecked,
        cardsBeatfilm
      );
      setFoundMovies(foundMoviesNow);
      localStorage.setItem('moviesListState', JSON.stringify(foundMoviesNow));
      setIsFound(!foundMoviesNow[0] ? 'Ничего не найдено' : false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cardsBeatfilm]
  );
  // -- Обработчика сабмита поиска -- />

  // <-- Обработчика фильтра сохраненных фильмов --
  const handleSavedSearch = useCallback(
    (inputData, shortChecked) => {
      const foundMoviesNow = SearchMovies(inputData, shortChecked, savedMovies);
      inputData === '' && shortChecked === false
        ? setFilteredMovies(savedMovies)
        : setFilteredMovies(foundMoviesNow);
    },
    [savedMovies]
  );
  // -- Обработчика фильтра сохраненных фильмов -- />

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
              exact
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
              setFilteredMovies={setFilteredMovies}
              isDeletedCard={isDeletedCard}
              setIsDeletedCard={setIsDeletedCard}
              shortChecked={shortChecked}
              setShortChecked={setShortChecked}
            />

            <ProtectedRoute
              exact
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              foundMovies={foundMovies}
              loadSavedMovies={loadSavedMovies}
              delCard={delCard}
              savedMovies={savedMovies}
              handleSavedSearch={handleSavedSearch}
              filteredMovies={filteredMovies}
              isDeletedCard={isDeletedCard}
              setIsDeletedCard={setIsDeletedCard}
              shortChecked={shortCheckedSaved}
              setShortChecked={setShortCheckedSaved}
            />

            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              handleLogout={handleLogout}
              handleUpdateUser={handleUpdateUser}
              serverErrorMessage={serverErrorMessage}
              setServerErrorMessage={setServerErrorMessage}
              isUpdateUserSuccessful={isUpdateUserSuccessful}
              setIsUpdateUserSuccessful={setIsUpdateUserSuccessful}
            />

            <Route exact path="/movie/:movieId">
              <Movie movieId={movieId} cardsBeatfilm={cardsBeatfilm} />
            </Route>

            <Route exact path="/signin">
              <Login
                handleLogin={handleLogin}
                loggedIn={loggedIn}
                serverErrorMessage={serverErrorMessage}
                setServerErrorMessage={setServerErrorMessage}
              />
            </Route>

            <Route exact path="/signup">
              <Register
                handleRegister={handleRegister}
                loggedIn={loggedIn}
                serverErrorMessage={serverErrorMessage}
                setServerErrorMessage={setServerErrorMessage}
              />
            </Route>

            <Route exact path="/404">
              <NotFound />
            </Route>

            <Route path="/404">
              {/* {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />} */}
              <Redirect to="/404" />
            </Route>
          </Switch>

          {isFooterLocation() && <Footer />}
        </>
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
