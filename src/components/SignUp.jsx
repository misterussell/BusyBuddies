import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState('');

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
    //   const email = this.state.email.trim();
    //   const password = this.state.password.trim();
    //   // sign up account
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
