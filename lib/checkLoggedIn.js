import {CognitoUserPool} from "amazon-cognito-identity-js";
import cognitoInfo from '../lib/cognitoInfo';

export default () => {
  const userPool = new CognitoUserPool({
    UserPoolId: cognitoInfo.UserPoolId,
    ClientId: cognitoInfo.ClientId
  });
  const cognitoUser = userPool.getCurrentUser();
  if(cognitoUser !== null) {
    return cognitoUser.getSession((err, res) => {
      if(err) {
        console.log('error ', err);
        throw err;
      }
      if(res && res.isValid()) {
        return {user: res, loggedIn: res.isValid()};
      } else {
        return {user: res, loggedIn: false};
      }
    });
  } else {
    return {user: {}, loggedIn: false};
  }
}
