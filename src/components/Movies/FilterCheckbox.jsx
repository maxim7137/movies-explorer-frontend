import { useLocation } from 'react-router-dom';

function FilterCheckbox({
  shortChecked,
  setShortChecked,
  handleSavedChange,
  handleShortChecked,
}) {
  let location = useLocation().pathname;

  function handleToggleShort(event) {
    setShortChecked(event.target.checked);
    if (location === '/saved-movies') {
      handleSavedChange();
    }
    if (location === '/movies') {
      handleShortChecked(event.target.checked);
    }
  }

  return (
    <label className="search__switch">
      <input
        className="search__input"
        type="checkbox"
        onChange={handleToggleShort}
        checked={shortChecked || false}
      />
      <span className="search__slider"></span>
    </label>
  );
}

export default FilterCheckbox;
