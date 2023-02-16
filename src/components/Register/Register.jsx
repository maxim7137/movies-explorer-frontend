import { useState } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import Logo from '../Header/Logo';

function Register({
  handleRegister,
  loggedIn,
  serverErrorMessage,
  setServerErrorMessage,
}) {
  // <-- управление компонентами --
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Стейты для валидации
  const [isInputValid, setIsInputValid] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    name: '',
    email: '',
    password: '',
  });

  let isFormValid =
    isInputValid.name &&
    isInputValid.email &&
    isInputValid.password &&
    !serverErrorMessage;

  // Обработчик изменения инпута для валидации
  function handleInput(e) {
    setTimeout(() => {
      setServerErrorMessage(false);
    }, 7000);

    const { name, validity, validationMessage } = e.target;

    setIsInputValid({
      ...isInputValid,
      [name]: validity.valid,
    });

    setErrorMessage({
      ...errorMessage,
      [name]: validity.patternMismatch
        ? 'Введите латиницу, кириллицу, пробел или дефис'
        : validationMessage,
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
    handleRegister(inputData.name, inputData.email, inputData.password);
  }

  // -- управление компонентами -- />

  return (
    <Route>
      {loggedIn ? (
        <Redirect to="./movies" />
      ) : (
        <div className="body__container">
          <main className="register">
            <Logo />
            <div className="register__main">
              <h1 className="register__head">Добро пожаловать!</h1>
              <form
                className="register__form"
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <label className="register__row">
                  <span className="register__key">Имя</span>
                  <input
                    className={
                      isInputValid.name
                        ? 'register__value'
                        : inputData.name
                        ? 'register__value register__value_error'
                        : 'register__value'
                    }
                    onChange={handleChange}
                    value={inputData.name || ''}
                    onInput={handleInput}
                    required
                    minLength="2"
                    maxLength="30"
                    type="text"
                    name="name"
                    id="name"
                    pattern="[a-zA-Zа-яА-Яё\s-]+"
                    autoComplete="off"
                  />
                  <span
                    className={
                      isInputValid.name
                        ? 'register__error'
                        : inputData.name
                        ? 'register__error register__error_visible'
                        : 'register__error'
                    }
                  >
                    {errorMessage.name}
                  </span>
                </label>
                <label className="register__row">
                  <span className="register__key">E-mail</span>
                  <input
                    className={
                      isInputValid.email && !serverErrorMessage
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
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    autoComplete="off"
                  />
                  <span
                    className={
                      isInputValid.email && !serverErrorMessage
                        ? 'register__error'
                        : inputData.email
                        ? 'register__error register__error_visible'
                        : 'register__error'
                    }
                  >
                    {serverErrorMessage || errorMessage.email}
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
                    name="password"
                    id="password"
                    autoComplete="off"
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
                  Зарегистрироваться
                </button>
              </form>
            </div>
            <div className="register__footer">
              <span className="register__question">Уже зарегистрированы?</span>
              <Link to="/signin" className="register__link">
                Войти
              </Link>
            </div>
          </main>
        </div>
      )}
    </Route>
  );
}

export default Register;
