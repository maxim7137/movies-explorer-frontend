import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="logo">
      <div className="logo__circle">
        <div className="logo__arc"></div>
      </div>
    </Link>
  );
}

export default Logo;
