import { useState } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import Logo from '../Header/Logo';

function Login({ handleLogin, loggedIn }) {
  // <-- управление компонентами --
  const [inputData, setInputData] = useState({ password: '', email: '' });

  // Стейты для валидации
  const [isInputValid, setIsInputValid] = useState({
    password: false,
    email: false,
  });

  const [errorMessage, setErrorMessage] = useState({ password: '', email: '' });

  let isFormValid = isInputValid.email && isInputValid.password;

  // Обработчик изменения инпута для валидации
  function handleInput(e) {
    const { name, validity, validationMessage } = e.target;
    setIsInputValid({
      ...isInputValid,
      [name]: validity.valid,
    });
    setErrorMessage({
      ...errorMessage,
      [name]: validationMessage,
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(inputData.email, inputData.password);
  }

  // -- управление компонентами -- />

  return (
      <Route>
        {loggedIn ? (
          <Redirect to="./saved-movies" />
        ) : (
          <div className="body__container">
            <main className="register">
              <Logo />
              <div className="register__main">
                <h1 className="register__head">Рады видеть!</h1>
                <form className="register__form" onSubmit={handleSubmit}>
                  <label className="register__row">
                    <span className="register__key">E-mail</span>
                    <input
                      className={
                        isInputValid.email
                          ? 'register__value'
                          : inputData.email
                          ? 'register__value register__value_error'
                          : 'register__value'
                      }
                      onChange={handleChange}
                      value={inputData.email || ''}
                      onInput={handleInput}
                      required
                      type="email"
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="E-mail"
                    />
                    <span
                      className={
                        isInputValid.email
                          ? 'register__error'
                          : inputData.email
                          ? 'register__error register__error_visible'
                          : 'register__error'
                      }
                    >
                      {errorMessage.email}
                    </span>
                  </label>
                  <label className="register__row">
                    <span className="register__key">Пароль</span>
                    <input
                      className={
                        isInputValid.password
                          ? 'register__value'
                          : inputData.password
                          ? 'register__value register__value_error'
                          : 'register__value'
                      }
                      onChange={handleChange}
                      value={inputData.password || ''}
                      onInput={handleInput}
                      required
                      minLength="6"
                      maxLength="30"
                      type="password"
                      autoComplete="off"
                      name="password"
                      id="password"
                      placeholder="Пароль"
                    />
                    <span
                      className={
                        isInputValid.password
                          ? 'register__error'
                          : inputData.password
                          ? 'register__error register__error_visible'
                          : 'register__error'
                      }
                    >
                      {errorMessage.password}
                    </span>
                  </label>
                  <button
                    type="submit"
                    className={
                      isFormValid
                        ? 'register__button'
                        : 'register__button register__button_disabled'
                    }
                    disabled={!isFormValid}
                  >
                    Войти
                  </button>
                </form>
              </div>
              <div className="register__footer">
                <span className="register__question">
                  Ещё не зарегистрированы?
                </span>
                <Link to="/signup" className="register__link">
                  Регистрация
                </Link>
              </div>
            </main>
          </div>
        )}
      </Route>
  );
}

export default Login;
