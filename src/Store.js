import { CognitoUserPool } from 'amazon-cognito-identity-js';
import cognito from './CognitoConfig';

export default {
  userPool: new CognitoUserPool({
    UserPoolId: cognito.UserPoolId,
    ClientId: cognito.ClientId
  }),
};
