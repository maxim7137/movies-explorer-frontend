function Profile({ logOut }) {
  return (
    <div className="body__container_profile">
      <main className="profile">
        <h1 className="profile__header">Привет, Максим!</h1>
        <form className="profile__form">
          <label className="profile__row">
            <span className="profile__key">Имя</span>
            <input
              className="profile__value"
              type="text"
              name="username"
              id="username"
              value="Максим"
            />
          </label>
          <label className="profile__row">
            <span className="profile__key">E-mail</span>
            <input
              className="profile__value"
              type="email"
              name="useremail"
              id="useremail"
              value="maxim@mail.ru"
            />
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
