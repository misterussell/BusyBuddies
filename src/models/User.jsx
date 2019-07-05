import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

import cognito from '../CognitoConfig';

export default class User {
  constructor(...args) {
    this.isAuthenticated = false;
    this.userPool = new CognitoUserPool({
      UserPoolId: cognito.UserPoolId,
      ClientId: cognito.ClientId
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
      this.userPool.signUp(email, password, attributeList, null, (err,result) => {
        if (err) {
          reject(err);
        } else resolve(result.user);
      });
    });
  }

}
