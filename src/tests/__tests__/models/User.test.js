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
      error: 'User not signed up. Email and password required.'
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
      error: 'User not confirmed. Email and code required.'
    });
  });

  it('should have a signIn method that if not rejected signs in the new user and adds the authenticated user details to local storage', () => {
    /*
      the signUp method utilizes the Cognito .authenticateUser method which requires
      - a cognito user object with the username and userPool details
      - an cognito AuthenticationDeatils objects containing keys for Username
      and Password where those credentials match what is saved on the user's account
      in the cognito user pool
      - an object with onSuccess and onFailure keys which return the result or errors
      from the cognito .authenticateUser call
    */
  });

  it('should return an error if the signIn method receive invalid args', () => {
    /*
      if the incorrect number of arguments are passed to this function a custom
      error is returned, otherwise the entire cognito error object is returned to
      the consumer. the cognito response is an object with the following properties:
        {
          message: str,
          __type: str
        }
    */
    const user = new User();
    expect(user.signIn(false)).rejects.toEqual({
      error: 'User not signed in. Email and password required.'
    });
  });

  it('should have a signOut method that signs out the active user', () => {
    /*
      the signOut method utilizes the Cognito .getCurrentUser() method to validate
      the current Cognito User logged in via the user object.
      the scoped signout function within the method confirms whether there is an
      active user registered to the userPool and if valid uses the Cognito
      .signOut() method to clear there credentials from the browser cache and
      log them out of Cognito.
    */
  });

  it('should have a getSession method that validates the current user based on session information stored in the browser', () => {
    /*
      need docs
    */
  });


});
