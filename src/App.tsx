// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Poetry from './components/Poetry';
import Poem from './components/subpages/poems/Poem';
import Blogs from './components/Blogs';
import Blog from './components/subpages/blogs/Blog';
import Pictures from './components/Pictures';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poems" element={<Poetry />} />
        <Route path="/poems/:id" element={<Poem />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/pictures" element={<Pictures />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
