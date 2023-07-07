import { h, Fragment, render } from 'preact';
import { Home } from './home.jsx';
import { Header } from './header.jsx';
import './index.css';
import { Router } from 'preact-router';
import { Poetry } from './subpages/poetry.jsx'; // assuming your poetry component is in subpages directory
import { Poem } from './subpages/poems/poem.jsx'; // import your new Poem component

function App() {
  return (
    <>
      <Header />
      <Router>
        <Home path="/" />
        <Poetry path="/poems" /> 
        <Poem path="/poems/:id" />
      </Router>
    </>

  );
}

render(<App />, document.getElementById('app'));
