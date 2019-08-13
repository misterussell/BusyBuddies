import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'

import SignIn from '../../../components/SignIn';
import Store from '../../../models/User';

const store = new Store();

beforeEach(() => {
  const div = document.createElement('div');

  ReactDOM.render(<SignIn user={ store.user } />, div);
  ReactDOM.unmountComponentAtNode(div);
});


describe('the SignIn component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    
    ReactDOM.render(<SignIn user={ store.user } />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders SignIn component correctly', () => {
    const SignInComponent = renderer.create(<SignIn user={ store.user }/>).toJSON();

    expect(SignInComponent).toMatchSnapshot();
  });

});
