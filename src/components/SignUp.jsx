import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
      confirm: null,
      confirmationCode: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  };

  render() {
    return(
      <div className="sign-up">
        <form>
          <p>email:</p>
          <input
            value={this.state.email}
            onChange={e => this.onChange('email', e.target.value)}
            placeholder="email"
          />
          <p>password:</p>
          <input
            value={this.state.password}
            onChange={e => this.onChange('password', e.target.value)}
            placeholder="password"
          />
          <button onClick={this.handleSubmit}>sign up</button>
        </form>
      </div>
    );
  };

  onChange(key, value) {
    this.setState({ [key]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    // sign up account
  }

  handleConfirm(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const code = this.state.confirmationCode.trim();
    // confirm account
  }

}

SignUp.propTypes = {
  store: PropTypes.object,
};

export default SignUp;
