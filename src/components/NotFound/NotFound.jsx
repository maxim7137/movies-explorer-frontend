function NotFound() {
  return (
    <main className="notfound">
      <div className="notfound__block">
        <h1 className="notfound__number">
          404
        </h1>
        <p className="notfound__text">Страница не найдена</p>
      </div>
      <a href="back" className="notfound__back">
        Назад
      </a>
    </main>
  );
}

export default NotFound;
