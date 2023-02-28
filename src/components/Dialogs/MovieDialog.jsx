function MovieDialog({ isDeletedCard, setIsDeletedCard }) {
  function closeOnBackDropClick({ currentTarget, target }) {
    const dialogElement = currentTarget;
    const isClickedOnBackDrop = target === currentTarget;
    if (isClickedOnBackDrop) {
      dialogElement.close();
      setIsDeletedCard(false);
    }
  }

  function closeOnButton() {
    setIsDeletedCard(false);
  }

  return (
    <dialog
      open={isDeletedCard ? true : false}
      className="dialog dialog_movie"
      onClick={closeOnBackDropClick}
    >
      <div className="dialog__wrapper dialog__wrapper_movie">
        <p className="dialog__text">{`Ошибка на сервере ${isDeletedCard}.`}</p>
        <p className="dialog__text">{`Проверьте интернет соединение или попробуйте позже.`}</p>
        <form className="dialog__form dialog__form_movie" method="dialog">
          <button
            onClick={closeOnButton}
            className="dialog__button dialog__button_movie"
          >
            Понятно.
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default MovieDialog;
