import Navigation from '../Navigation/Navigation';
import Logo from './Logo';

function Header({ loggedIn}) {
  return (
    <header className="header">
      <Logo />
      <Navigation loggedIn={loggedIn}/>
    </header>
  );
}

export default Header;
