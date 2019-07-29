import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormValidator from '../models/FormValidator';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
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
    const formState = { email, password };
    const validation = formValidator.validate(formState);
    if (validation.isValid) {
      props.user.signIn('max@misterussell.com', 'NewUser1!').then(response => {
        console.log('no error signing in');
        props.user.setAuthenticated();
      }).catch(error => {
        setError(error.message);
      });
    } else {
      // render the validatoin errors
    }
  }

}

SignIn.propTypes = {
  user: PropTypes.object,
};

export default SignIn;
