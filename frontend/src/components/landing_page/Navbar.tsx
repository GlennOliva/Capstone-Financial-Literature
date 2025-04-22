import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="efinance-navbar">
      <div className="efinance-navbar-container">
        <div className="efinance-navbar-brand">
          <div className="efinance-logo">
            {/* SVG or logo image here */}
          </div>
          E-Finance
        </div>

        <nav className="efinance-navbar-links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#features">Features</a>
        </nav>

        <div className="efinance-navbar-button">
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
