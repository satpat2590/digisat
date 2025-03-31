// src/subpages/blogs/blogs.ts
  export interface Blog {
    title: string;
    date: string;
    description: string;
    img: string;
    path: string;
  }
  
  export const blogs: Blog[] = [
    {
      title: "Quest for Motivation",
      date: "July 7th, 2023",
      description:
        "How do you find that initial spark? What drives you to excel in a particular field?",
      img: "/blog-icons/motivation.jpg",
      path: "/blogs/0",
    },
    {
      title: "Journey into Docker Compose",
      date: "July 8th, 2023",
      description:
        "Tired of versioning issues between your team? Here's a little non-violent foray into the world of orchestrating containers!",
      img: "/blog-icons/docker.png",
      path: "/blogs/1",
    },
    {
      title: "Attention Is All You Need",
      date: "March 30th, 2025",
      description:
        "Do you think you can reclaim your attention?",
      img: "/blog-icons/attention.png",
      path: "/blogs/2",
    },
    {
      title: "Ancient History + Theories",
      date: "TBD",
      description:
        "What is the true history behind humans? This information will be hard to uncover, but it doesn't hurt to speculate!",
      img: "/blog-icons/history.png",
      path: "/blogs/3",
    },
  ];
  