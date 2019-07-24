import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

import Routes from './Routes';

import Store from './Store';

import './App.css';

const store = new Store();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  store.user.getSession().then(result => {
    setIsAuthenticated(true);
    console.log(result);
  }).catch(error => console.log(error));
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
          {
            isAuthenticated ? null
            : (
              <div className="not-authenticated">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              </div>
            )
          }
        </ul>
      </div>

      <hr />

      <Routes store={store}/>
    </Router>
  );
}

export default App;
