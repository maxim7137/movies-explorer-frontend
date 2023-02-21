import { useLocation } from 'react-router-dom';

function FilterCheckbox({ shortChecked, setShortChecked, handleSavedChange }) {
  let location = useLocation().pathname;
  function handleToggleShort(event) {
    setShortChecked(event.target.checked);
    if (location === '/saved-movies') {
      handleSavedChange();
    }
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
