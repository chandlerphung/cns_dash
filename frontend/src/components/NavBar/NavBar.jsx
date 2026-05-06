import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({ onLogout }) {
  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/logout`, {
      method: "POST",
      credentials: "include"
    }).then(() => onLogout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">CNS Dashboard</div>
      <ul className="navbar-links">
        <li><Link to="/">Customer Order</Link></li>
        <li><Link to="/sales">Sales</Link></li>
        <li><Link to="/employee-totals">Employee Totals</Link></li>
        <li><Link to="/clocked-in">Clocked In</Link></li>
        <li><Link to="/shop-total">Shop Total</Link></li>
        <li><Link to="/employee-codes">Employee Codes</Link></li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default NavBar;