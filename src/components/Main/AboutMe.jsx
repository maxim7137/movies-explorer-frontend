import ava from '../../images/ava.jpg';

const idValue = 'me';

function AboutMe() {
  return (
    <section className="me">
      <div className="me__container">
        <h2 className="me__title section-title" id={idValue.toString()}>
          Студент
        </h2>
        <div className="me__discription-container">
          <div className="me__text">
            <p className="me__name">Максим</p>
            <p className="me__bio">Фронтенд-разработчик, 35 лет</p>
            <p className="me__about">
              Я родился в Башкирии, в настоящее время живу в Балашихе, закончил
              факультет технического обеспечения ПВИ ВВ МВД РФ. У меня есть
              жена, сын и дочь. Мне нравится все что связано с современными
              технологиями, устройство гаджетов, компьютеров и их программного
              обеспечения. Недавно начал кодить. В 2023 году закончил курс по
              веб-разработке в Яндекс.Практикуме.
            </p>
            <a
              className="me__link"
              href="https://github.com/maxim7137"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
          <div className="me__avatar">
            <img className="me__image" src={ava} alt="Фото студента" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
