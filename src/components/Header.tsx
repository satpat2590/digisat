import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <Link to="/" className="header-link">
        <p className="header-title">Satyam Patel</p>
      </Link>
      <nav>
        <div className={`nav-container ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/blogs" className="nav-link" onClick={closeMenu}>
            Blogs
          </Link>
          <Link to="/poems" className="nav-link" onClick={closeMenu}>
            Poetry
          </Link>
          <Link to="/pictures" className="nav-link" onClick={closeMenu}>
            Pictures
          </Link>
          <Link to="/tasks" className="nav-link" onClick={closeMenu}>
            Tasks
          </Link>
        </div>
        <button
          className="nav-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ fontSize: isMenuOpen ? '20px' : '25px' }}
        >
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </nav>
    </header>
  );
};

export default Header;