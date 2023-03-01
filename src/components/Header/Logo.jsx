import { NavLink } from 'react-router-dom';

function Logo() {
  return (
    <NavLink to="/" className="logo" activeClassName="logo_selected">
      <div className="logo__circle">
        <div className="logo__arc"></div>
      </div>
    </NavLink>
  );
}

export default Logo;
