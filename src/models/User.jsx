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

  signUp(cognitoRequest, email, password) {
    cognitoRequest();
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        value: email,
      })
    ];
    return new Promise((resolve, reject) => {
      this.userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
        } else resolve(result.user);
      });
    });
  }

}
