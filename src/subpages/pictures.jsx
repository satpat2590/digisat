import { h } from 'preact';
import './pictures.css';
import { pictures } from './pictures/pictures';

export function Pictures() {
    return (
        <div className="container">
            <div className="masonry">
                {pictures.map((pic, i) => (
                    <div className="item" key={i}>
                        <img src={pic.url} alt={pic.description} />
                    </div>
                ))}
            </div>
        </div>
    );
}
