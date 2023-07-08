import { h } from 'preact';
import { Link } from 'preact-router';
import { blogs } from './blogs/blogs.js'; // import your array of blogs
import { useEffect }from 'preact/hooks';
import './blogs.css';

export function Blogs() {
    // useEffect(() => {
    //     // Set the overflow to 'auto' when the component mounts
    //     document.body.style.overflowY = 'auto';
    
    //     // Set it back to 'hidden' when the component unmounts
    //     return () => {
    //       document.body.style.overflowY = 'hidden';
    //     };
    // }, []);  // Empty dependency array so this runs only on mount and unmount

  return (
    <div className="blogs">
      {blogs.map((blog, index) => (
        <Link href={blog.path} className="blog-link" key={index}>
          <div 
            className="blog-card"
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#32CD32'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#202020'}
            onTouchStart={e => e.currentTarget.style.backgroundColor = '#32CD32'}
            onTouchEnd={e => e.currentTarget.style.backgroundColor = '#202020'}>
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
}

