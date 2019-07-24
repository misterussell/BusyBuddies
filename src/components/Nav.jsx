import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
  return (
    <div className="navigation">
      <ul>
        <li>
          <Link to="/">Home (Logo)</Link>
        </li>
        <li>
          <Link to="/myaccount">My Account</Link>
        </li>
        {
          props.user.isAuthenticated ? null
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
  );
};

export default Nav;
