import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Header/Logo';

function Register() {
  // <-- управление компонентами --
  const [inputData, setInputData] = useState({
    username: '',
    password: '',
    email: '',
  });

  // Стейты для валидации
  const [isInputValid, setIsInputValid] = useState({
    username: true,
    password: true,
    email: true,
  });

  const [errorMessage, setErrorMessage] = useState({
    username: '',
    password: '',
    email: '',
  });

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
  /*
  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(inputData.email, inputData.password);
  }
   */

  // -- управление компонентами -- />

  return (
    <div className="body__container">
      <main className="register">
        <Logo />
        <div className="register__main">
          <h1 className="register__head">Добро пожаловать!</h1>
          <form className="register__form">
            <label className="register__row">
              <span className="register__key">Имя</span>
              <input
                className={
                  isInputValid.username
                    ? 'register__value'
                    : inputData.username
                    ? 'register__value register__value_error'
                    : 'register__value'
                }
                onChange={handleChange}
                value={inputData.username || ''}
                onInput={handleInput}
                required
                minLength="2"
                maxLength="30"
                type="text"
                name="username"
                id="username"
              />
              <span
                className={
                  isInputValid.username
                    ? 'register__error'
                    : inputData.username
                    ? 'register__error register__error_visible'
                    : 'register__error'
                }
              >
                {errorMessage.username}
              </span>
            </label>
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
                name="email"
                id="email"
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
                name="password"
                id="password"
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
            <button className="register__button" type="submit">
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
  );
}

export default Register;
