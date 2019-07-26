import React from 'react';

function SignOut(props) {
  props.user.signOut();
  return (
    <div className="sign-out">
      You have been signed out.
    </div>
  );
};

export default SignOut;
