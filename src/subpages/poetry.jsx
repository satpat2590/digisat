import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './poetry.css';
import { poems } from './poems/poems'; 
import { Link } from 'preact-router/match'; 

export function Poetry() {

    useEffect(() => {
        // Set the overflow to 'auto' when the component mounts
        document.body.style.overflowX = 'hidden';
    
        // Set it back to 'hidden' when the component unmounts
        return () => {
          document.body.style.overflowX = 'hidden';
        };
      }, []);  // Empty dependency array so this runs only on mount and unmount
    return (
        <>
        <div className="container">
            <div className="grid">
                {poems.map((poem) => (
                    <Link className="poemLink" href={poem.path}>
                        <div className="card" 
                            onTouchStart={e => e.currentTarget.style.backgroundColor = '#32CD32'} 
                            onTouchEnd={e => e.currentTarget.style.backgroundColor = '#000000'}
                            key={poem.path}>
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