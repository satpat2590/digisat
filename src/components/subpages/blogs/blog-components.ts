// src/subpages/blogs/blog-components.ts
import Blog1 from './blog-content/blog1';
import Blog2 from './blog-content/blog2';
import Blog3 from './blog-content/blog3';
import Blog4 from './blog-content/blog4';

// We define the type of each element as React.FC
export const BlogComponents: React.FC[] = [
  Blog1,
  Blog2,
  Blog3,
  Blog4
];
