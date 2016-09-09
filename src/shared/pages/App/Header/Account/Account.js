import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux'
import { authInitialized, attemptLogin, signOut } from 'shared/modules/user/userActions'
import firebaseApi from 'shared/utils/firebase'

class Account extends Component {
  
  onLoginButtonClick = () => {
    this.props.dispatch(attemptLogin())
  }

  onLogoutButtonClick = () => {
    this.props.dispatch(signOut())
  }

  componentDidMount() {
    firebaseApi.initAuth()
      .then((user) => {
        this.props.dispatch(authInitialized(user))
      })
      .catch((error) => {
        console.error('error while initializing Firebase Auth', error);
      });
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