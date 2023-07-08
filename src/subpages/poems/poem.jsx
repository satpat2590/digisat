import { h, Component } from 'preact';
import { poems } from './poems.js';
import { PoemComponents } from './poem-components.jsx';
import './poem.css';
import { useEffect } from 'preact/hooks';

export class Poem extends Component {
    render({ id }) {
        const poem = poems.find((poem) => poem.path === `/poems/${id}`);
        const formattedId = id.charAt(0).toUpperCase() + id.slice(1);
        const PoemComponent = PoemComponents[formattedId];
        
        // useEffect(() => {
        //     // Set the overflow to 'auto' when the component mounts
        //     document.body.style.overflowY = 'auto';
        
        //     // Set it back to 'hidden' when the component unmounts
        //     return () => {
        //       document.body.style.overflowY = 'hidden';
        //     };
        //   }, []);  // Empty dependency array so this runs only on mount and unmount

        return (
            <div>
                <h2 className="poem">{poem.title}</h2>
                <PoemComponent />
            </div>
        );
    }
}