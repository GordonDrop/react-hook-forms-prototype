import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import SimpleFormPage from './pages/SimpleForm';

const Index = () => <>Index</>;
const NoMatch = () => <>NoMatch</>;

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link className="nav__link" to={'/simple-form'}>
                Simple form page
              </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/simple-form" component={SimpleFormPage} />

          <Route exact path="/" component={Index} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
