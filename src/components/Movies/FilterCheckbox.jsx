function FilterCheckbox({ shortChecked, setShortChecked }) {
  function handleToggleShort(event) {
    setShortChecked(event.target.checked);
  }

  return (
    <label className="search__switch">
      <input
        className="search__input"
        type="checkbox"
        onChange={handleToggleShort}
        checked={shortChecked}
      />
      <span className="search__slider"></span>
    </label>
  );
}

export default FilterCheckbox;
