import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header: React.FC = () => {
  const [header, setHeader] = useState<boolean>(false);

  return (
    <header className="header">
      <Link to="/" className="header-link">
        <p className="header-title">Satyam Patel</p>
      </Link>
      <nav>
        <div
          className="nav-container"
          style={{ transform: header ? 'translateX(-75%)' : 'translateX(100%)' }}
        >
          <Link to="/blogs" className="nav-link" onClick={() => setHeader(!header)}>
            Blogs
          </Link>
          <Link to="/poems" className="nav-link" onClick={() => setHeader(!header)}>
            Poetry
          </Link>
          <Link to="/pictures" className="nav-link" onClick={() => setHeader(!header)}>
            Pictures
          </Link>
        </div>
        <button
          className="nav-button"
          onClick={() => setHeader(!header)}
          style={{ fontSize: header ? '20px' : '25px' }}
        >
          {header ? '✖' : '☰'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
