import { Link } from 'react-router-dom';
import Logo from '../Header/Logo';

function Register() {
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
                className="register__value"
                type="text"
                name="username"
                id="username"
              />
              <span className="register__error">Что-то пошло не так ...</span>
            </label>
            <label className="register__row">
              <span className="register__key">E-mail</span>
              <input
                className="register__value"
                type="email"
                name="useremail"
                id="useremail"
              />
              <span className="register__error">Что-то пошло не так ...</span>
            </label>
            <label className="register__row">
              <span className="register__key">Пароль</span>
              <input
                className="register__value"
                type="password"
                name="userpassword"
                id="userpassword"
              />
              <span className="register__error">Что-то пошло не так ...</span>
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
