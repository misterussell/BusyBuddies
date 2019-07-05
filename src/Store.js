import { CognitoUserPool } from 'amazon-cognito-identity-js';
import cognito from './CognitoConfig';

import User from './models/User';

export default {
  user: new User(),
};
