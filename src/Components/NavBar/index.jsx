import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/settings">Settings</Link></li>
    </ul>
  </nav>
);

export default NavBar;