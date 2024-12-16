import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          WatchWorld
        </Link>
        <div
          className={`menu-icon ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={toggleMenu}>
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/productos" className="nav-link" onClick={toggleMenu}>
              Relojes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/carrito" className="nav-link" onClick={toggleMenu}>
              Carrito
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
