import AWS from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';
import sinon from 'sinon';

import User from '../../../models/User';
import Store from '../../../Store';

AWSMock.setSDKInstance(AWS);

afterEach(() => {
  AWSMock.restore();
});

describe('the User class', () => {
  const email = 'max@misterussell.com'
  const password = 'NewUser1';
  const response = {
    email,
    password
  };

  it('should be unauthenticated by default', () => {
    const user = new User();
    expect(user.isAuthenticated).toBe(false);
  });

  it('should have a signUp method that returns an email and password', () => {
    const user = new User();
    user.signUp(email, password).then(data => expect(data).toEqual(response))
                                .catch(err => err);
  });

  it('should return a failure method if the signUp method receives invalid args', () => {
    const user = new User();
    expect(user.signUp(false)).rejects.toEqual({
      error: 'User not signed up.'
    })
  });

});
