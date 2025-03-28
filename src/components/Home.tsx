import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

interface HomeLink {
  title: string;
  description: string;
}

const links: HomeLink[] = [
  { title: 'blogs', description: 'thoughts, but let loose' },
  { title: 'poems', description: 'structured thoughts about the world' },
  { title: 'pictures', description: 'collection of photos from my life travels' },
];

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-description">
        <p>
          avid geek of history, language, and automation. working to improve my skills in every facet of my life!
          <br /><br />
          i believe the wheel of innovation is spinning faster and faster, and with that, the amount of information considered to be 'general' has also expanded.
          <br /><br />
          i hope to be on the forefront of this wheel, guiding its path.
          <br /><br />
          here you'll find my journey to become a natural philosophist! enjoy :)
        </p>
        <img className="tree" src="/treeofmemory.svg" alt="Tree of Memory" />
      </div>

      <div className="home-links">
        {links.map((name) => (
          <Link
            key={name.title}
            to={`/${name.title.toLowerCase()}`}
            style={{ textDecoration: 'none', color: '#33ff00' }}
          >
            <div
              style={{
                textAlign: 'center',
                color: '#33ff00',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                marginBottom: '1.5rem',
              }}
            >
              <img
                className="home-images"
                src={`/${name.title}.png`}
                alt={name.title}
              />
              {name.title}
              <p>{name.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
