import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState('');


  const errorDiv = error
    ? (
      <div className="sign-up-error">
        <p>{error}</p>
      </div>
    )
    : null;

  const confirmDiv = confirm
    ? (
      <div className="confirmation">
        <p>Please check your email for your confirmation code.</p>
        <p>Code:</p>
        <input
          value={confirmationCode}
          onChange={handleConfirmationCode}
          placeholder="code"
          label="code"
        />
        <button onClick={handleConfirm}>confirm</button>
      </div>
    )
    : null;

  return (
    <div className="sign-up">
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
          >sign up</button>
      </form>
      {
        errorDiv
      }
      {
        confirmDiv
      }
    </div>
  );

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // props.user
    props.user.signUp('max@misterussell.com', 'NewUser1!').then(response => {
      console.log('no error')
      setConfirm(true);
      setError(null);
    }).catch(error => {
      setError(error.message);
    });
  }

  // handleConfirm = (e) => {
  //   e.preventDefault();
  //   const email = this.state.email.trim();
  //   const code = this.state.confirmationCode.trim();
  //   // confirm account
  // }

}

SignUp.propTypes = {
  store: PropTypes.object,
};

export default SignUp;
