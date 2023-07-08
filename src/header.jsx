import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router';
import './header.css';

export function Header() {
  const [header, setHeader] = useState(false);
  return (
    <>
      <header className="header">
        <Link href="/" className="header-link">
          <p className="header-title">
            Satyam Patel
          </p>
        </Link>
        <nav>
          <div
            className="nav-container"
            style={{
              transform: header ? 'translateX(-75%)' : 'translateX(100%)'
            }}
          >
            <Link href="/blogs" className="nav-link" onClick={() => setHeader(!header)}>Blogs</Link>
            <Link href="/poems" className="nav-link" onClick={() => setHeader(!header)}>Poetry</Link>
            <Link href="/pictures" className="nav-link" onClick={() => setHeader(!header)}>Pictures</Link>
          </div>
          <button
            className="nav-button"
            onClick={() => setHeader(!header)}
            style={{
              fontSize: header ? '20px' : '25px',
            }}
          >
            {header ? '✖' : '☰'}
          </button>
        </nav>
      </header>
    </>
  );
}
