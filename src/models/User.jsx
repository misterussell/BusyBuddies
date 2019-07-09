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
          error: 'User not signed up.'
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
          error: 'Email and code required.'
        });
      };
    });
  }

}
