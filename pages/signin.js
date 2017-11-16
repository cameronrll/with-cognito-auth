import {CognitoUserPool, AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import React from "react";
import checkLoggedIn from '../lib/checkLoggedIn';
import redirect from "../lib/redirect";

const userPool = new CognitoUserPool({
  UserPoolId: cognitoInfo.UserPoolId,
  ClientId: cognitoInfo.ClientId
});

export default class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount () {
    const {user, loggedIn} = checkLoggedIn();
    if(loggedIn) {
      // If Logged in redirect to the home page
      redirect({}, '/')
    }
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const authenticationData = {
      Email : email,
      Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username : email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log('access token + ' + result.getAccessToken().getJwtToken());
        /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
        console.log('idToken + ' + result.idToken.jwtToken);
        // Redirect to the user zone
        redirect({}, '/');
      },

      onFailure: function(err) {
        console.log('error ', err);
      },

    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text"
               value={this.state.email}
               placeholder="Email"
               onChange={this.handleEmailChange.bind(this)}/>
        <input type="password"
               value={this.state.password}
               placeholder="Password"
               onChange={this.handlePasswordChange.bind(this)}/>
        <input type="submit"/>
        <p>Not got an account? <a href="/create-account">Signup</a> now</p>
      </form>
    );
  }
}
