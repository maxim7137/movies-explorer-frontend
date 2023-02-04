function AboutProject() {
  return (
    <section className="about" id="about">
      <div className="about__container">
        <h2 className="about__title section-title">О проекте</h2>
        <div className="about__discription-container">
          <div className="about__description">
            <p className="about__subtitle">Дипломный проект включал 5 этапов</p>
            <p className="about__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about__description">
            <p className="about__subtitle">На выполнение диплома ушло 5 недель</p>
            <p className="about__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about__chart">
          <div className="about__time">
            <p className="about__week">1 неделя</p>
            <p className="about__week">4 недели</p>
          </div>
          <div className="about__time">
            <p className="about__caption">Back-end</p>
            <p className="about__caption">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
