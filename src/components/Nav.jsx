import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
  return (
    <div className="navigation">
      <ul>
        <li className="nav-link">
          <Link to="/">Home (Logo)</Link>
        </li>
        <li className="nav-link">
          <Link to="/myaccount">My Account</Link>
        </li>
        {
          props.user.isAuthenticated ? null
          : (
            <div className="not-authenticated-links">
              <li className="nav-link">
                <Link to="/signup">Sign Up</Link>
              </li>
              <li className="nav-link">
                <Link to="/signin">Sign In</Link>
              </li>
            </div>
          )
        }
        {
          props.user.isAuthenticated ?
            (
              <li className="nav-link">
                <Link to="/signout">Sign Out</Link>
              </li>
            ) : null
        }
      </ul>
    </div>
  );
};

export default Nav;
