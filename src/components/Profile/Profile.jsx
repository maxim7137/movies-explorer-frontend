import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext'; // контекст текущего пользователя

function Profile({
  handleLogout,
  handleUpdateUser,
  serverErrorMessage,
  setServerErrorMessage,
}) {
  const user = useContext(CurrentUserContext);

  // <-- управление компонентами --
  const [inputData, setInputData] = useState({
    name: user.name,
    email: user.email,
  });

  // Стейты для валидации
  const [isInputValid, setIsInputValid] = useState({
    name: true,
    email: true,
  });

  const [errorMessage, setErrorMessage] = useState({
    name: '',
    email: '',
  });

  let isFormValid =
    isInputValid.name && isInputValid.email && !serverErrorMessage;

  useEffect(() => {
    setInputData(user);
  }, [user]);

  // Обработчик изменения инпута для валидации
  function handleInput(e) {
    setServerErrorMessage(false);

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
    handleUpdateUser(inputData);
  }

  // -- управление компонентами -- />

  return (
    <div className="body__container_profile">
      <main className="profile">
        <h1 className="profile__header">Привет, {user.name}!</h1>
        <form
          className="profile__form"
          id="profile__form"
          onSubmit={handleSubmit}
        >
          <label className="profile__row">
            <span className="profile__key">Имя</span>
            <input
              className={
                isInputValid.name
                  ? 'profile__value'
                  : inputData.name
                  ? 'profile__value profile__value_error'
                  : 'profile__value'
              }
              onChange={handleChange}
              value={inputData.name || ''}
              onInput={handleInput}
              required
              type="text"
              name="name"
              id="name"
              placeholder="Имя"
              minLength={2}
              maxLength={30}
              pattern="[a-zA-Zа-яА-Я\s-]+"
              autoComplete="off"
            />
            <span
              className={
                isInputValid.name
                  ? 'profile__error'
                  : inputData.name
                  ? 'profile__error profile__error_name profile__error_visible'
                  : 'profile__error'
              }
            >
              {errorMessage.name}
            </span>
          </label>
          <label className="profile__row">
            <span className="profile__key">E-mail</span>
            <input
              className={
                isInputValid.email && !serverErrorMessage
                  ? 'profile__value'
                  : inputData.email
                  ? 'profile__value profile__value_error'
                  : 'profile__value'
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
                  ? 'profile__error'
                  : inputData.email
                  ? 'profile__error profile__error_visible'
                  : 'profile__error'
              }
            >
              {serverErrorMessage || errorMessage.email}
            </span>
          </label>
        </form>
        <div className="profile__buttons">
          <button
            form="profile__form"
            type="submit"
            className={
              isFormValid
                ? 'profile__button profile__button_edit'
                : 'profile__button profile__button_edit profile__button_disabled'
            }
            disabled={!isFormValid}
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_exit"
            type="button"
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </div>
  );
}

export default Profile;
