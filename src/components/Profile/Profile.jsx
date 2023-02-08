import { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile({ logOut }) {
  // <-- управление компонентами --
  const [inputData, setInputData] = useState({ username: '', useremail: '' });

  // Стейты для валидации
  const [isInputValid, setIsInputValid] = useState({
    username: true,
    useremail: true,
  });

  const [errorMessage, setErrorMessage] = useState({
    username: '',
    useremail: '',
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
    <div className="body__container_profile">
      <main className="profile">
        <h1 className="profile__header">Привет, Максим!</h1>
        <form className="profile__form">
          <label className="profile__row">
            <span className="profile__key">Имя</span>
            <input
              className={
                isInputValid.username
                  ? 'profile__value'
                  : inputData.username
                  ? 'profile__value profile__value_error'
                  : 'profile__value'
              }
              onChange={handleChange}
              value={inputData.username || ''}
              onInput={handleInput}
              required
              type="text"
              name="username"
              id="username"
              placeholder="Имя"
              minLength={2}
              maxLength={30}
            />
            <span
              className={
                isInputValid.username
                  ? 'profile__error'
                  : inputData.username
                  ? 'profile__error profile__error_name profile__error_visible'
                  : 'profile__error'
              }
            >
              {errorMessage.username}
            </span>
          </label>
          <label className="profile__row">
            <span className="profile__key">E-mail</span>
            <input
              className={
                isInputValid.useremail
                  ? 'profile__value'
                  : inputData.useremail
                  ? 'profile__value profile__value_error'
                  : 'profile__value'
              }
              onChange={handleChange}
              value={inputData.useremail || ''}
              onInput={handleInput}
              required
              type="email"
              name="useremail"
              id="useremail"
              placeholder="E-mail"
            />
            <span
              className={
                isInputValid.useremail
                  ? 'profile__error'
                  : inputData.useremail
                  ? 'profile__error profile__error_visible'
                  : 'profile__error'
              }
            >
              {errorMessage.useremail}
            </span>
          </label>
        </form>
        <div className="profile__buttons">
          <button
            className="profile__button profile__button_edit"
            type="submit"
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_exit"
            type="submit"
            onClick={logOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </div>
  );
}

export default Profile;
