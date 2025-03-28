import React from 'react';
import './pictures.css';
import { pictures } from './subpages/pictures/pictures';

interface Picture {
  url: string;
  description: string;
}

const Pictures: React.FC = () => {
  return (
    <div className="container">
      <div className="masonry">
        {pictures.map((pic: Picture, i: number) => (
          <div className="item" key={i}>
            <img src={pic.url} alt={pic.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pictures;
