import React from 'react';
import checkLoggedIn from '../lib/checkLoggedIn'
import redirect from "../lib/redirect";

export default class Index extends React.Component {

  componentDidMount () {
    const {user, loggedIn} = checkLoggedIn();
    if(!loggedIn) {
      // If Not Logged in redirect to login page
      redirect({}, '/signin')
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to the user zone</h1>
        <button>signout</button>
      </div>
    )
  }
}
