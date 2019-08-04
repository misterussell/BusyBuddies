import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormValidator from '../models/FormValidator';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInErr, setSignInErr] = useState({
    isInvalid: false,
    message: '',
  });
  const [emailErr, setEmailErr] = useState({
    isInvalid: false,
    message: '',
  });
  const [passwordErr, setPasswordErr] = useState({
    isInvalid: false,
    message: '',
  });
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

  const emailErrDiv = emailErr.isInvalid
    ? (
      <div className="form-field-error">
        <p>{ emailErr.message }</p>
      </div>
    ) : null;

  const passwordErrDiv = passwordErr.isInvalid
    ? (
      <div className="form-field-error">
        <p>{ passwordErr.message }</p>
      </div>
    ) : null;

  const signInErrDiv = signInErr
    ? (
      <div className="sign-in-error">
        { signInErr.message }
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
        {
          emailErrDiv
        }
        <p>password:</p>
        <input
          value={password}
          onChange={handlePasswordChange}
          placeholder="password"
          label="password"
        />
        {
          passwordErrDiv
        }
        <button
          onClick={handleSubmit}
          label="submit"
          >sign in</button>
      </form>
      {
        signInErrDiv
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
    const formState = { email, password };
    const validation = formValidator.validate(formState);
    if (validation.isValid) {
      props.user.signIn('max@misterussell.com', 'NewUser1!').then(response => {
        console.log('no error signing in');
        props.user.setAuthenticated();
      }).catch(error => {
        setSignInErr({isInvalid: true, message: error.message});
      });
    } else {
      // - render the validation errors
      // - validatoin.isValid will be false when these errors need to be thrown
      // - form validated errors they stored as keys in the validation object
      // - confirmatoin errors returned from Amazon are stored in the confirmationErr object
      // - first iterate over the form validation errors as these are going to be thrown before the
      // cognito error
      if (validation.email.isInvalid) setEmailErr(validation.email);
      if (validation.password.isInvalid) setPasswordErr(validation.password);
    }
  }
}

SignIn.propTypes = {
  user: PropTypes.object,
};

export default SignIn;
