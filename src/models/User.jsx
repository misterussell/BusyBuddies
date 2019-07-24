import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

import cognitoConfig from '../CognitoConfig';

export default class User {
  constructor() {
    this.isAuthenticated = false;
    this.userPool = new CognitoUserPool({
      UserPoolId: cognitoConfig.UserPoolId,
      ClientId: cognitoConfig.ClientId
    });
  }

  isAuthenticated = null;

  setAuthenticated() {
    this.isAuthenticated = true;
  }

  signUp(email, password) {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        value: email,
      })
    ];

    return new Promise((resolve, reject) => {
      if (email && password) {
        this.userPool.signUp(email, password, attributeList, null, (err, result) => {
          if (err) {
            reject(err);
          } else resolve(result.user);
        });
      } else {
        reject({
          error: 'User not signed up. Email and password required.'
        });
      };
    });
  }

  confirm(email, code) {
    const user = {
      Username: email,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(user);
    return new Promise((resolve, reject) => {
      if (email && code) {
        cognitoUser.confirmRegistration(code, true, (err, result) => {
          if (err) {
            reject(err.message || JSON.stringify(err));
          } else resolve(result);
        });
      } else {
        reject({
          error: 'User not confirmed. Email and code required.'
        });
      };
    });
  }

  signIn(email, password) {
    const authData = {
      Username: email,
      Password: password,
    };
    const cognitoAuthDetails = new AuthenticationDetails(authData);
    const user = {
      Username: email,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(user);
    return new Promise((resolve, reject) => {
      if (email && password) {
        cognitoUser.authenticateUser(cognitoAuthDetails, {
          onSuccess: function(result) {
            resolve(result.getAccessToken().getJwtToken());
          },
          onFailure: function(error) {
            reject(error);
          },
        });
      } else {
        reject({
          error: 'User not signed in. Email and password required.'
        });
      }
    });
  }

  signOut() {
    const currentUser = this.userPool.getCurrentUser();
    const signOut = (user) => user ? currentUser.signOut() : null;
    return signOut(currentUser);
  }

  getSession() {
    const user = this.userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
      if (user) {
        user.getSession((error, result) => {
          if (error) reject(error);
          if (result) {
            resolve(result.getAccessToken().getJwtToken());
            this.setAuthenticated();
          };
        });
      } else {
        reject('No user session found.');
      };
    });
  }

}
