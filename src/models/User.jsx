import {
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

import Store from '../Store';

export default class User {
  isAuthenticated: false;

  signUp(email, password) {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        value: email,
      })
    ];
    return new Promise((resolve, reject) => {
      Store.userPool.signUp(email, password, attributeList, null, (err,result) => {
        if (err) {
          reject(err);
        } else resolve(result.user);
      });
    });
  }

  
}
