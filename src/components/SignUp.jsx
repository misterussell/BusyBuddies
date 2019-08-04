import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormValidator from '../models/FormValidator';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationErr, setConfirmationErr] = useState({
    isInvalid: false,
    message: '',
  });
  const [emailErr, setEmailErr] = useState({
    isInavlid: false,
    message: '',
  });
  const [passwordErr, setPasswordErr] = useState({
    isInvalid: false,
    message: '',
  });
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

  const confirmationErrDiv = confirmationErr.isInvalid
    ? (
      <div className="sign-up-error">
        <p>{ confirmationErr.message }</p>
      </div>
    ) : null;

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
    ) : null;

    const passwordField = awaitConfirm
      ? null
      : (
        <div className="sign-up password">
          <p>password:</p>
          <input
            value={password}
            onChange={handlePasswordChange}
            placeholder="password"
            label="password"
            className="password-input"
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
          className="email-input"
        />
        {
          // if there is a form validatoin error for the email field
          // render a div under the email field with the error message
          emailErrDiv
        }
        {
          // the password field is only shown while no confirmation code has been
          // requested
          passwordField
        }
        {
          // if there a form validatoin error for the password field
          // render a div under the password field with the error message
          passwordErrDiv
        }
        <button
          onClick={handleSubmit}
          label="submit"
          className="submit-button"
          >sign up</button>
          <button onClick={handleExistingCode}>I already have a code</button>
      </form>
      {
        confirmationErrDiv
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
    const validation = formValidator.validate(formState);
    if (validation.isValid) {
      props.user.signUp('max@misterussell.com', 'NewUser1!')
       .then(response => {
        setAwaitConfirm(true);
        setConfirmationErr({
          isInvalid: false,
          message: '',
        });
      }).catch((err) => {
        console.log(err);
        setConfirmationErr({
          isInvalid: true,
          message: err.message
        });
      });
    } else {
      // - render the validation errors
      // - validatoin.isValid will be false when these errors need to be thrown
      // - form validated errors they stored as keys in the validation object
      // - confirmatoin errors returned from Amazon are stored in the confirmationErr object
      // - first iterate over the form validation errors as these are going to be thrown before the
      // cognito error
      if (validation.email.isInvalid) setEmailErr({ isInvalid: true, message: validation.email.message });
      if (validation.password.isInvalid) setPasswordErr({ isInvalid: true, message: validation.password.message });
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

SignUp.propTypes = {
  user: PropTypes.object,
};

export default SignUp;
