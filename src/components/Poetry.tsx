import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './poetry.css';
import { poems } from './subpages/poems/poems.ts';

interface PoemType {
  path: string;
  title: string;
  desc: string;
  img: string;
}

const Poetry: React.FC = () => {
  useEffect(() => {
    // Set overflow style when the component mounts
    document.body.style.overflowX = 'hidden';
    // Cleanup: reset overflow style when the component unmounts
    return () => {
      document.body.style.overflowX = 'hidden';
    };
  }, []);

  return (
    <div className="container">
      <div className="grid">
        {poems.map((poem: PoemType) => (
          <Link className="poemLink" to={poem.path} key={poem.path}>
            <div
              className="card"
              onTouchStart={(e: React.TouchEvent<HTMLDivElement>) =>
                (e.currentTarget.style.backgroundColor = '#32CD32')
              }
              onTouchEnd={(e: React.TouchEvent<HTMLDivElement>) =>
                (e.currentTarget.style.backgroundColor = '#000000')
              }
            >
              <h2>{poem.title}</h2>
              <p>{poem.desc}</p>
              <img src={poem.img} alt={poem.title} width="50" height="50" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Poetry;
