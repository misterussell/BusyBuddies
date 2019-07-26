import React, { useState } from 'react';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const errorDiv = error
    ? (
      <div className="sign-in-error">
        { error }
      </div>
    )
    : null;

  return (
    <div className="sign-in">
      <form>
        <p>email:</p>
        <input
          value={email}
          onChange={handleEmailChange}
          placeholder="email"
          label="email"
        />
        <p>password:</p>
        <input
          value={password}
          onChange={handlePasswordChange}
          placeholder="password"
          label="password"
        />
        <button
          onClick={handleSubmit}
          label="submit"
          >sign in</button>
      </form>
      {
        errorDiv
      }
    </div>
  );

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.user.signIn('max@misterussell.com', 'NewUser1!').then(response => {
      console.log('no error signing in');
      props.user.setAuthenticated();
    }).catch(error => {
      setError(error.message);
    });
  }

}

export default SignIn;
