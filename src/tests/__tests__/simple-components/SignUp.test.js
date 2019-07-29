import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import SignUp from '../../../components/SignUp';
import User from '../../../models/User';

const user = new User();

beforeEach(() => {
  const div = document.createElement('div');
  ReactDOM.render(<SignUp user={ user }/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('the SignUp component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SignUp user={ user }/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders a SignUp component correctly', () => {
    const SignUpComponent = renderer.create(<SignUp user={ user }/>).toJSON();
    expect(SignUpComponent).toMatchSnapshot();
  });

  it('should have access to the user instance from store', () => {
    // do I need to test this with propTypes?
  });

  it('should render two inputs and a button initially', () => {
    // while awaitConfirm is null the password input is shown
    // when the signUp form is submit the the password is hidden
    // if the user chooses to confirm later the password input is hidden
    // inputs with classNames: email-input, password-input
    // button className: submit-button
  });

  it('should render two inputs and a button when confirming account', () => {
    // when awaitConfirm is set to true the password input is unmounted
    // and the confirm input is mounted
  });

  it('should render an error for each invalid from field', () => {
    // when an form validation error is stored to state
    // an error div should be rendered
  });
});
