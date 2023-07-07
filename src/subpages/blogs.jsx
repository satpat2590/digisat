import { h } from 'preact';
import { Link } from 'preact-router';
import { blogs } from './blogs/blogs.js';  // import your array of blogs

export function Blogs() {
  return (
    <div>
      {blogs.map((blog, index) => (
        <Link href={blog.path} style={{ textDecoration: 'none', color: 'white' }} key={index}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'center',
            margin: '1rem',
            padding: '1rem',
            backgroundColor: '#202020',
            borderRadius: '0px',
            transition: 'background-color 0.3s'
          }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#32CD32'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#202020'}>
            <img src={blog.img} alt={blog.title} style={{ width: '200px', height: '200px', marginRight: '1rem' }} />
            <div>
              <h2 style={{ margin: 0 }}>{blog.title}</h2>
              <p style={{ margin: 0 }}>{blog.date}</p>
              <p>{blog.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
