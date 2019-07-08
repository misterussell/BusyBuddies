import React, { useState } from 'react';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
  }

}

export default SignIn;
