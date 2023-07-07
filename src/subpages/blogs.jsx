// import { h } from 'preact';
// import { Link } from 'preact-router';
// import { blogs } from './blogs/blogs.js';  // import your array of blogs
// import { useEffect }from 'preact/hooks';

// export function Blogs() {
//     useEffect(() => {
//         // Set the overflow to 'auto' when the component mounts
//         document.body.style.overflowY = 'auto';
    
//         // Set it back to 'hidden' when the component unmounts
//         return () => {
//           document.body.style.overflowY = 'hidden';
//         };
//     }, []);  // Empty dependency array so this runs only on mount and unmount

//   return (
//     <div>
//       {blogs.map((blog, index) => (
//         <Link href={blog.path} style={{ textDecoration: 'none', color: 'white' }} key={index}>
//           <div style={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'start',
//             alignItems: 'center',
//             margin: '1rem',
//             padding: '1rem',
//             backgroundColor: '#202020',
//             borderRadius: '0px',
//             transition: 'background-color 0.3s'
//           }}
//             onMouseEnter={e => e.currentTarget.style.backgroundColor = '#32CD32'}
//             onMouseLeave={e => e.currentTarget.style.backgroundColor = '#202020'}>
//             <img src={blog.img} alt={blog.title} style={{ width: '200px', height: '200px', marginRight: '1rem' }} />
//             <div>
//               <h2 style={{ margin: 0 }}>{blog.title}</h2>
//               <p style={{ margin: 0 }}>{blog.date}</p>
//               <p>{blog.description}</p>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }


import { h } from 'preact';
import { Link } from 'preact-router';
import { blogs } from './blogs/blogs.js'; // import your array of blogs
import { useEffect }from 'preact/hooks';
import './blogs.css';

export function Blogs() {
    useEffect(() => {
        // Set the overflow to 'auto' when the component mounts
        document.body.style.overflowY = 'auto';
    
        // Set it back to 'hidden' when the component unmounts
        return () => {
          document.body.style.overflowY = 'hidden';
        };
    }, []);  // Empty dependency array so this runs only on mount and unmount

  return (
    <div className="blogs">
      {blogs.map((blog, index) => (
        <Link href={blog.path} className="blog-link" key={index}>
          <div 
            className="blog-card"
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#32CD32'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#202020'}>
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

