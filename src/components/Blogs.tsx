// src/subpages/Blogs.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { blogs, Blog } from './subpages/blogs/blogs';
import './blogs.css';

const Blogs: React.FC = () => {
  return (
    <div className="blogs">
      {blogs.map((blog: Blog, index: number) => (
        <Link to={blog.path} className="blog-link" key={index}>
          <div
            className="blog-card"
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) =>
              (e.currentTarget.style.backgroundColor = '#32CD32')
            }
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) =>
              (e.currentTarget.style.backgroundColor = '#202020')
            }
            onTouchStart={(e: React.TouchEvent<HTMLDivElement>) =>
              (e.currentTarget.style.backgroundColor = '#32CD32')
            }
            onTouchEnd={(e: React.TouchEvent<HTMLDivElement>) =>
              (e.currentTarget.style.backgroundColor = '#202020')
            }
          >
            <img src={blog.img} alt={blog.title} className="blog-img" />
            <div className="blog-info">
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-date">{blog.date}</p>
              <p className="blog-description">{blog.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blogs;
