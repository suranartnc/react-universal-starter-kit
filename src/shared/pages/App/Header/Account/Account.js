import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux'
import { attemptLogin, attemptLogout } from 'shared/modules/user/userActions'

class Account extends Component {
  
  onLoginButtonClick = () => {
    this.props.dispatch(attemptLogin())
  }

  onLogoutButtonClick = () => {
    this.props.dispatch(attemptLogout())
  }

  render() {
    const { user, auth } = this.props
    if (auth.isLogged) {
      return (
        <div>
          <div>
            <img src={user.photoURL} />
            <p>{user.displayName}</p>
            <a onClick={this.onLogoutButtonClick}>Logout</a>
          </div>
        </div>
      )
    }
    return (
      <div>
        <a onClick={this.onLoginButtonClick}>Login</a>
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