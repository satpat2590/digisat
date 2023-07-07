// import { h } from 'preact';
// import { useRoute } from 'preact-router';  // import the useParams hook
// import { blogs } from './blogs';  // import your array of blogs

// export default function Blog({ id }) {
//   const blog = blogs.find((blog) => blog.path === `/blogs/${id}`);

//   // display a loading message while the blog is being fetched
//   if (!blog) return <div>Loading...</div>;

//   return (
    // <div>
    //   <h2>{blog.title}</h2>
    //   <p>{blog.date}</p>
    //   <img src={blog.img} alt={blog.title} />
    //   <p>{blog.description}</p>
    // </div>
//   );
// }

import { h, Component } from 'preact';
import { blogs } from './blogs.js';;
import { useEffect } from 'preact/hooks';

export class Blog extends Component {
    render({ id }) {
        const blog = blogs.find((blog) => blog.path === `/blogs/${id}`);
        // const formattedId = id.charAt(0).toUpperCase() + id.slice(1);
        // const PoemComponent = PoemComponents[formattedId];
        
        useEffect(() => {
            // Set the overflow to 'auto' when the component mounts
            document.body.style.overflowY = 'auto';
        
            // Set it back to 'hidden' when the component unmounts
            return () => {
              document.body.style.overflowY = 'hidden';
            };
          }, []);  // Empty dependency array so this runs only on mount and unmount

        return (
            <div>
                <h2>{blog.title}</h2>
                    <p>{blog.date}</p>
                    <img src={blog.img} alt={blog.title} />
                <p>{blog.description}</p>
            </div>
        );
    }
}