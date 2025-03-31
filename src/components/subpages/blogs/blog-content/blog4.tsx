// src/subpages/blogs/blog-content/blog1.tsx
import React from 'react';
import '../blog.css';
import { blogs } from '../blogs';

const Blog4: React.FC = () => {
  return (
    <div className="page">
      <div className="blog">
        <h1 className="blog-title">{blogs[3].title}</h1>
        <div className="blog-date">Posted on {blogs[3].date}</div>
        <div className="blog-content">
                <p>
                    This content will be created very soon!

                </p>
        </div>
      </div>
    </div>
  );
};

export default Blog4;
