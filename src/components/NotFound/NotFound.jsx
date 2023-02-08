import { useHistory } from 'react-router-dom';

function NotFound() {
  let history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <main className="notfound">
      <div className="notfound__block">
        <h1 className="notfound__number">404</h1>
        <p className="notfound__text">Страница не найдена</p>
      </div>
      <button className="notfound__back" onClick={handleClick}>
        Назад
      </button>
    </main>
  );
}

export default NotFound;
