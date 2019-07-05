import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Routes from './Routes';

import './App.css';

function App() {
  return (
    <Router>
      <div className="navigation">
        <ul>
          <li>
            <Link to="/">Home (Logo)</Link>
          </li>
          <li>
            <Link to="/myaccount">My Account</Link>
          </li>
        </ul>
      </div>

      <hr />

      <Routes />
    </Router>
  );
}

export default App;
