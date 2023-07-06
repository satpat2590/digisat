import { h, Fragment, render } from 'preact';
import { Home } from './home.jsx';
import { Header } from './header.jsx';
import './index.css';
import { Router } from 'preact-router';
import { Poetry } from './subpages/poetry.jsx'; // assuming your poetry component is in subpages directory


function App() {
  return (
    <>
      <Header />
      <Router> 
        <Home path="/"/>
        <Poetry path="/poetry" />
      </Router>
    </>
  );
}

render(<App />, document.getElementById('app'));
