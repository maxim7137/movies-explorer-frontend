function ProfileDialog({ isUpdateUserSuccessful }) {
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
      className="dialog"
      onClick={closeOnBackDropClick}
    >
      <div className="dialog__wrapper">
        <p className="dialog__text">Профиль успешно изменен.</p>
        <form className="dialog__form" method="dialog">
          <button className="dialog__button">Прекрасно!</button>
        </form>
      </div>
    </dialog>
  );
}

export default ProfileDialog;
