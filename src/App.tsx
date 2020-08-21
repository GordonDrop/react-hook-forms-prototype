import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { SimpleFormWithShow } from './pages/SimpleFormWithShow';
import { SimpleFormWithRequired } from './pages/SimpleFormWithRequired';
import { NestedFormWithShow } from './pages/NestedFormWithShow';
import { NestedFormWithRequire } from './pages/NestedFormWithRequire';

const Index = () => <>Index</>;
const NoMatch = () => <>NoMatch</>;

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link className="nav__link" to={'/simple-form-with-show'}>
                Simple form with Show
              </Link>
            </li>

            <li>
              <Link className="nav__link" to={'/simple-form-with-required'}>
                Simple form with Required
              </Link>
            </li>

            <li>
              <Link className="nav__link" to={'/nested-form-with-show'}>
                Nested form with Show
              </Link>
            </li>

            <li>
              <Link className="nav__link" to={'/nested-form-with-require'}>
                Nested form with Require
              </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/simple-form-with-show" component={SimpleFormWithShow} />
          <Route exact path="/simple-form-with-required" component={SimpleFormWithRequired} />
          <Route exact path="/nested-form-with-show" component={NestedFormWithShow} />
          <Route exact path="/nested-form-with-require" component={NestedFormWithRequire} />

          <Route exact path="/" component={Index} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
