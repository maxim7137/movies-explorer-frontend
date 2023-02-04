import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, logIn, logOut }) {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo__circle">
          <div className="logo__arc"></div>
        </div>
      </div>
      <Navigation loggedIn={loggedIn} logIn={logIn} logOut={logOut} />
    </header>
  );
}

export default Header;
