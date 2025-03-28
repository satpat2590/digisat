// src/subpages/poems/Poem.tsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { poems } from './poems'; // Adjust this path based on your file location
import { PoemComponents } from './poem-components.ts'; // Adjust if needed
import './poem.css';

const Poem: React.FC = () => {
  // Get the 'id' parameter from the URL
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>No poem ID provided.</div>;
  }

  // Find the poem object that matches the URL path
  const poem = poems.find((p) => p.path === `/poems/${id}`);

  if (!poem) {
    return <div>Poem not found.</div>;
  }

  // Capitalize the first letter of the id to match keys in PoemComponents
  const formattedId = id.charAt(0).toUpperCase() + id.slice(1);
  const PoemComponent = PoemComponents[formattedId];

  if (!PoemComponent) {
    return <div>Poem component not found for {formattedId}.</div>;
  }

  // Optional: Adjust body overflow when this component is mounted
  useEffect(() => {
    document.body.style.overflowY = 'auto';
    return () => {
      document.body.style.overflowY = 'hidden';
    };
  }, []);

  return (
    <div>
      <h2 className="poem">{poem.title}</h2>
      <PoemComponent />
    </div>
  );
};

export default Poem;
