import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux'
import { logIn, logOut } from 'shared/modules/auth/authActions'

class Account extends Component {
  
  onLoginButtonClick = () => {
    this.props.dispatch(logIn())
  }

  onLogoutButtonClick = () => {
    this.props.dispatch(logOut())
  }

  render() {
    const { user, auth } = this.props
    if (auth.isLogged) {
      return (
        <div>
          <Link to="/write">Write a story</Link>
          <div>
            <img src={user.photoURL} />
            <p>{user.displayName}</p>
            <a href="#" onClick={this.onLogoutButtonClick}>Logout</a>
          </div>
        </div>
      )
    }
    return (
      <div>
        <a href="#" onClick={this.onLoginButtonClick}>Login</a>
      </div>
    )
  }
}

Account.propTypes = {
  dispatch: PropTypes.func.isRequired
} 

function mapStateToProps({ user, auth }) {
  return {
    user,
    auth
  }
}

export default connect(mapStateToProps)(Account);