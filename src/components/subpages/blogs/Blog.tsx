// src/subpages/blogs/Blog.tsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { blogs } from './blogs'; // adjust the path as needed
import { BlogComponents } from './blog-components';
import BlogError from './BlogError';

const Blog: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>No blog ID provided.</div>;
  }

  // Find the blog object based on the URL path (optional, in case you want to display additional data)
  const blog = blogs.find((b) => b.path === `/blogs/${id}`);

  // Convert id to a number for array indexing.
  const blogIndex = parseInt(id, 10);
  const BlogComponent = blog ? BlogComponents[blogIndex] : BlogError;

  // Optionally adjust body overflow on mount/unmount
  useEffect(() => {
    document.body.style.overflowY = 'auto';
    return () => {
      document.body.style.overflowY = 'hidden';
    };
  }, []);

  return (
    <div>
      <BlogComponent />
    </div>
  );
};

export default Blog;
