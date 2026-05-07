import { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/logout`, {
      method: "POST",
      credentials: "include"
    }).then(() => onLogout());
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">CNS Dashboard</div>
      <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
      </button>
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={handleLinkClick}>Customer Order</Link></li>
        <li><Link to="/sales" onClick={handleLinkClick}>Sales</Link></li>
        <li><Link to="/employee-totals" onClick={handleLinkClick}>Employee Totals</Link></li>
        <li><Link to="/clocked-in" onClick={handleLinkClick}>Clocked In</Link></li>
        <li><Link to="/shop-total" onClick={handleLinkClick}>Shop Total</Link></li>
        <li><Link to="/employee-codes" onClick={handleLinkClick}>Employee Codes</Link></li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default NavBar;
