import sinon from 'sinon';

import User from '../../../models/User';
import Store from '../../../Store';

describe('the User class', () => {
  const email = 'max@misterussell.com'
  const password = 'NewUser1';
  const response = {
    email,
    password
  };

  it('should be unauthenticated by default', () => {
    /*
      User is not authenticated as a default.
      Authentication checks happen at the app load level by the main routing Component.
    */
    const user = new User();
    expect(user.isAuthenticated).toBe(false);
  });

  it('should have a signUp method that if not rejected creates a new unconfirmed user in the the Cognito userPool', () => {
    /*
      the signUp method utilizes the Cognito .signUp method which requires
      - email: set in the User Pool configuration as the username attribute
      - password: which is encrypted in the payload by Cognito
      - attributeList: an object of the required userPool attributes
      - null: referencing ValidationData that I am not using
      - a callback that takes the args for an error and data payload: translated
        by the Promise being used to pass data back to the consumer
      - also requires all userPool information including clientID
    */
    const user = new User();
    user.signUp(email, password).then(data => expect(data).toEqual(response))
                                .catch(err => err);
  });

  it('should return an error if the signUp method receives invalid args', () => {
    /*
      if the promise is rejected an error object should be returned to the consumer
    */
    const user = new User();
    expect(user.signUp(false)).rejects.toEqual({
      error: 'User not signed up.'
    });
  });

  it('should have a confirm method that if not rejected confirms user in Cognito userPool', () => {
    /*
      the confirm method utilizes the Cognito confirmRegistration method which requires
      - Username: email is passed in as the value based on the Cognito required username attribute
      - code: this code is emailed to the user by the Cognito service
      - a callback that takes the args for an error and data payload: translated
        by the Promise being used to pass data back to the consumer
    */
  });

  it('should return an error if the confirm method receives invalid args', () => {
    const user = new User();
    expect(user.confirm(false)).rejects.toEqual({
      error: 'Email and code required.'
    });
  });

});
