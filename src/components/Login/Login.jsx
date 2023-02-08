import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Header/Logo';

function Login({ logIn }) {
  // <-- управление компонентами --
  const [inputData, setInputData] = useState({ password: '', email: '' });

  // Стейты для валидации
  const [isInputValid, setIsInputValid] = useState({
    password: true,
    email: true,
  });

  const [errorMessage, setErrorMessage] = useState({ password: '', email: '' });

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
          <h1 className="register__head">Рады видеть!</h1>
          <form className="register__form">
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
            <button className="register__button" type="submit" onClick={logIn}>
              Войти
            </button>
          </form>
        </div>
        <div className="register__footer">
          <span className="register__question">Ещё зарегистрированы?</span>
          <Link to="/signup" className="register__link">
            Регистрация
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Login;
