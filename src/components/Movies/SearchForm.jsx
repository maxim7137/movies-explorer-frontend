import FilterCheckbox from './FilterCheckbox'

function SearchForm() {
  return (
    <section className="search">
      <div className="search__border">
        <form className="search__container">
          <div className="search__wrap search__wrap_input">
            <input
              className="search__text"
              type="text"
              placeholder="Фильм"
              name="search"
              autocomplete="off"
            />
            <button className="search__find" type="submit"></button>
            <div className="search__separator"></div>
          </div>
          <div className="search__wrap search__wrap_checkbox">
            <FilterCheckbox />
            <span className="search__short">Короткометражки</span>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
