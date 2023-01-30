function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <p className="footer__copy">
        &copy; {new Date().getFullYear()} Mesto Russia
      </p>
      <ul>
        <li><a href="https://practicum.yandex.ru">Яндекс.Практикум</a></li>
        <li><a href="https://github.com/maxim7137">Github</a></li>
      </ul>
    </footer>
  );
}

export default Footer;
