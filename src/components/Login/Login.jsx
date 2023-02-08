import Logo from '../Header/Logo';

function Login() {
  return (
    <main className="register">
      <Logo />
      <div className="register__main">
        <h1 className="register__head">Рады видеть!</h1>
        <form className="register__form">
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
            Войти
          </button>
        </form>
      </div>
      <div className="register__footer">
        <span className="register__question">Ещё зарегистрированы?</span>
        <a href="login" className="register__link">
          Регистрация
        </a>
      </div>
    </main>
  );
}

export default Login;
