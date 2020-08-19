import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SimpleFormPage from './pages/SimpleForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link className="nav__link" to={"/simple-form"}>Simple form page</Link></li>
          </ul>
        </nav>

        <Route exact path="/simple-form" component={SimpleFormPage} />
        <Route path="*">{"asdf"}</Route>
      </BrowserRouter>
    </>
  );
}

export default App;
