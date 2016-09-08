import firebase from 'firebase'
import firebaseApi from 'shared/utils/firebase'
import { push } from 'react-router-redux';

export const USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS'
export const USER_IS_ADMIN_SUCCESS = 'USER_IS_ADMIN_SUCCESS'
export const AUTH_INITIALIZATION_DONE = 'AUTH_INITIALIZATION_DONE'
export const AUTH_LOGGED_IN_SUCCESS = 'AUTH_LOGGED_IN_SUCCESS'
export const AUTH_LOGGED_OUT_SUCCESS = 'AUTH_LOGGED_OUT_SUCCESS'

function extractUserProperties(firebaseUser) {
  const user = {};
  const userProperties = [
    'displayName',
    'email',
    'emailVerified',
    'isAnonymous',
    'photoURL',
    'providerData',
    'providerId',
    'refreshToken',
    'uid',
    'isAdmin'
  ];
  userProperties.map((prop) => {
    if (prop in firebaseUser) {
      user[prop] = firebaseUser[prop];
    }
  });
  return user;
}

export function attemptLogin() {
  return (dispatch) => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        dispatch(userCreated(result.user));
      }).catch(function(error) {
        console.log('login failed', error)
      })
  };
}

export function userCreated(user) {
  return (dispatch) => {
    firebaseApi.databaseSet('/users/' + user.uid, extractUserProperties(user))
      .then(() => {
        dispatch(authLoggedIn(user.uid))
      })
      .catch((error) => {
        console.log(error)
      });
  }
}

export function userLoadedSuccess(user) {
  return {
    type: USER_LOADED_SUCCESS, 
    user: extractUserProperties(user)
  };
}

export function userIsAdminSuccess() {
  return {
    type: USER_IS_ADMIN_SUCCESS
  };
}

export function authInitialized(user) {
  return (dispatch) => {
    dispatch(authInitializedDone());
    if (user) {
      dispatch(authLoggedIn(user.uid));
    } else {
      dispatch(authLoggedOutSuccess());
    }
  };
}

export function authInitializedDone() {
  return {
    type: AUTH_INITIALIZATION_DONE
  };
}

export function authLoggedIn(userUID) {
  return (dispatch) => {
    dispatch(authLoggedInSuccess(userUID));
    firebaseApi.GetChildAddedByKeyOnce('/users', userUID)
      .then(user => {
        dispatch(userLoadedSuccess(user.val()));
      })
      .catch(error => {
        console.log(error)
      });
  };
}

export function authLoggedInSuccess(userUID) {
  return {
    type: AUTH_LOGGED_IN_SUCCESS, 
    userUID
  };
}

export function attemptLogout() {
  return (dispatch) => {
    dispatch(authLoggedOutSuccess())
    dispatch(push('/'));
  }
}

export function authLoggedOutSuccess() {
  return {
    type: AUTH_LOGGED_OUT_SUCCESS
  }
}