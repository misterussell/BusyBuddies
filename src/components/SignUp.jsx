import React, { useState } from 'react';
import FormValidator from '../models/FormValidator';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [awaitConfirm, setAwaitConfirm] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState('');
  const formValidator = new FormValidator([
    {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'Please provide an email address.',
    },
    {
      field: 'email',
      method: 'isEmail',
      validWhen: true,
      message: 'Please enter a valid email address.',
    },
    {
      field: 'password',
      method: 'isEmpty',
      validWhen: false,
      message: 'Please enter a password'
    }
  ]);

  const errorDiv = error
    ? (
      <div className="sign-up-error">
        <p>{error}</p>
      </div>
    )
    : null;

  const confirmDiv = awaitConfirm
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

    const passwordField = awaitConfirm
      ? null
      : (
        <div className="password">
          <p>password:</p>
          <input
            value={password}
            onChange={handlePasswordChange}
            placeholder="password"
            label="password"
          />
        </div>
      );

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
        {
          passwordField
        }
        <button
          onClick={handleSubmit}
          label="submit"
          >sign up</button>
          <button onClick={handleExistingCode}>I already have a code</button>
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
    const formState = { email, password };
    const validation = formValidator(formState);
    if (validation.isValid) {
      props.user.signUp('max@misterussell.com', 'NewUser1!').then(response => {
        console.log('no error signing up');
        setAwaitConfirm(true);
        setError(null);
      }).catch(error => {
        setError(error.message);
      });
    } else {
      // show the validation errors
    }
  }

  function handleExistingCode(e) {
    e.preventDefault();
    setAwaitConfirm(true)
  }

  function handleConfirm(e) {
    e.preventDefault();
    props.user.confirm('max@misterussell.com', confirmationCode)
  }

  function handleConfirmationCode(e) {
    setConfirmationCode(e.target.value);
  }
};

export default SignUp;
