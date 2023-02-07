import Navigation from '../Navigation/Navigation';
import Logo from './Logo';

function Header({ loggedIn, logIn, logOut }) {
  return (
    <header className="header">
      <Logo />
      <Navigation loggedIn={loggedIn} logIn={logIn} logOut={logOut} />
    </header>
  );
}

export default Header;
