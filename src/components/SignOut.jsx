import React from 'react';
import PropTypes from 'prop-types';

function SignOut(props) {
  props.user.signOut();
  return (
    <div className="sign-out">
      You have been signed out.
    </div>
  );
};

SignOut.propTypes = {
  user: PropTypes.object,
};

export default SignOut;
