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
  it('should be unauthenticated by default', () => {
    const user = new User();
    expect(user.isAuthenticated).toBe(false);
  });

  it('should have an asyncronous signUp method', () => {
    const requestSend = sinon.stub();
    AWSMock.mock('CognitoIdentity','signUp', requestSend);
  });

});
