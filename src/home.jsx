import './home.css';
import { Link } from 'preact-router';

export function Home() {
  return (
    <>
      <div className="home-container">
        <div className="home-description">
          <p>
            avid geek of history, language, and automation. working to improve
            my skills in every facet of my life!
            <br></br>
            <br></br>i believe the wheel of innovation is spinning faster and
            faster, and with that, the amount of information considered to be
            'general' has also expanded.
            <br></br>
            <br></br>i hope to be on the forefront of this wheel, guiding its
            path.
            <br></br>
            <br></br>
            here you'll find my journey to become a natural philosophist! enjoy
            :)
          </p>
          <img
            className="tree"
            src="./treeofmemory.svg"
            alt="Sample"
          />
        </div>
        <div className="home-links">
          {[{title: 'blogs', description: 'thoughts, but let loose'}, {title: 'poems', description: 'structured thoughts about the world'}, {title: 'pictures', description: 'collection of photos from my life travels'}].map((name) => (
            <Link
              href={`/${name.title.toLowerCase()}`}
              style={{ textDecoration: 'none', color: '#33ff00' }}
            >
              <div style={{ textAlign: 'center', color: '#33ff00', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginBottom: '1.5rem' }}>
                <img className="home-images"
                  src={`${name.title}.png`}
                />
                  {name.title}
                <p>{name.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

