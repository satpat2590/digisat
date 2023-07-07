// import { h } from 'preact';
// import { useState } from 'preact/hooks';
// import { Link } from 'preact-router';

// export function Header() {
//   const [header, setHeader] = useState(false);
//   return (
//     <>
//       <header
//         style={{
//           background: 'black',
//           display: 'flex',
//           color: 'white',
//           justifyContent: 'space-between',
//         }}
//       >
//       <Link href="/" style={{textDecoration: 'none'}}>
//         <p
//           style={{
//             marginLeft: '0.5rem',
//             fontFamily: 'Mrs Saint Delafield',
//             fontSize: '30px',
//             margin: '0.5rem 0.8rem',
//             marginBottom: '0',
//             color: '#FFFFFF'
//           }}
//         >
//           Satyam Patel
//         </p>
//         </Link>
//         <nav>
//           <div
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               position: 'absolute',
//               transform: header ? 'translateX(-75%)' : 'translateX(100%)',
//               transition: 'transform 0.6s ease-in-out',
//               top: 55,
//               background: 'black',
//               color: 'white',
//             }}
//           >
//             <a
//               href="/blogs"
//               style={{ textDecoration: 'none', color: 'white', margin: '1rem' }}
//             >
//               Blogs
//             </a>
//             <a
//               href="/poems"
//               style={{ textDecoration: 'none', color: 'white', margin: '1rem' }}
//             >
//               Poetry
//             </a>
//             <a
//               href="/pictures"
//               style={{ textDecoration: 'none', color: 'white', margin: '1rem' }}
//             >
//               Pictures
//             </a>
//           </div>
//           <button
//             style={{
//               border: 'none',
//               color: 'white',
//               background: 'black',
//               marginTop: '0.4rem',
//               fontSize: header ? 20 : 25,
//             }}
//             onClick={() => setHeader(!header)}
//           >
//             {header ? '✖' : '☰'}
//           </button>
//         </nav>
//       </header>
//     </>
//   );
// }


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
            <Link href="/blogs" className="nav-link">Blogs</Link>
            <Link href="/poems" className="nav-link">Poetry</Link>
            <Link href="/pictures" className="nav-link">Pictures</Link>
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
