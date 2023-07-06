import { render } from 'preact';
import { App } from './app.jsx';
import './index.css';
import { Header } from './header.jsx';
function Main() {
  return (
    <>
      <App />
    </>
  );
}

render(<Main />, document.getElementById('app'));
