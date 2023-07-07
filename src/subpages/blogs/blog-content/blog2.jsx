import { h } from 'preact';
import '../blog.css';

export default function Blog2() {
    return (
        <div className="blog">
            <h1 className="blog-title">Blog Title 2</h1>
            <div className="blog-date">Posted on July 8, 2023</div>
            <div className="blog-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
    );
}