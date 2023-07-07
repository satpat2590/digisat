import { h } from 'preact';
import { useState } from 'preact/hooks';
import './poetry.css';
import { poems } from './poems/poems'; 
import { Link } from 'preact-router/match'; 


export function Poetry() {
    return (
        <>
        <div className="container">
            <div className="grid">
                {poems.map((poem) => (
                    <Link className="poemLink" href={poem.path}>
                        <div className="card" key={poem.path}>
                            <h2>{poem.title}</h2>
                            <p>{poem.desc}</p>
                            <img src={poem.img} alt={poem.title} width="50" height="50" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        </>



    );
}