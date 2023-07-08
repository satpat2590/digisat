import { h, Component } from 'preact';
import { blogs } from './blogs.js';;
import { useEffect } from 'preact/hooks';
import { BlogComponents } from './blog-components.jsx';
import BlogError from './blogerror.jsx';

export class Blog extends Component {
    render({ id }) {
        const blog = blogs.find((blog) => blog.path === `/blogs/${id}`);
        const BlogComponent = blog ? BlogComponents[id] : BlogError;        
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
                <BlogComponent />
            </div>
        );
    }
}