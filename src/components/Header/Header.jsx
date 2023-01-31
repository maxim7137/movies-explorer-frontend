import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo__circle">
          <div className="logo__arc"></div>
        </div>
      </div>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}

export default Header;
