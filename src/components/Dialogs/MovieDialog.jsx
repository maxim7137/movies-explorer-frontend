function MovieDialog({ isUpdateUserSuccessful }) {
  function closeOnBackDropClick({ currentTarget, target }) {
    console.log(currentTarget);
    console.log(target);
    const dialogElement = currentTarget;
    const isClickedOnBackDrop = target === dialogElement;
    if (isClickedOnBackDrop) {
      dialogElement.close();
    }
  }

  return (
    <dialog
      open={isUpdateUserSuccessful}
      className="dialog dialog_movie"
      onClick={closeOnBackDropClick}
    >
      <div className="dialog__wrapper dialog__wrapper_movie">
        <p className="dialog__text dialog__text_movie">Профиль успешно изменен.</p>
        <form className="dialog__form dialog__form_movie" method="dialog">
          <button className="dialog__button dialog__button_movie">Прекрасно!</button>
        </form>
      </div>
    </dialog>
  );
}

export default MovieDialog;
