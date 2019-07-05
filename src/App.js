import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

import Routes from './Routes';

import Store from './Store';

import './App.css';

function App() {
  return (
    <Router>
      {/* move navigation to its own component */}
      <div className="navigation">
        <ul>
          <li>
            <Link to="/">Home (Logo)</Link>
          </li>
          <li>
            <Link to="/myaccount">My Account</Link>
          </li>
          <li>
            <Link to="signup">Sign Up</Link>
          </li>
          <li>
            <Link to="sign-in">Sign In</Link>
          </li>
        </ul>
      </div>

      <hr />

      <Routes store={new Store()}/>
    </Router>
  );
}

export default App;
