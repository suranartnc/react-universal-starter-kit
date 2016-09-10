import { FirebaseAPI, extractUserProperties } from 'shared/utils/firebaseUtils'
import { push } from 'react-router-redux';

export const USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS'
export const USER_IS_ADMIN_SUCCESS = 'USER_IS_ADMIN_SUCCESS'
export const AUTH_INITIALIZATION_DONE = 'AUTH_INITIALIZATION_DONE'
export const AUTH_LOGGED_IN_SUCCESS = 'AUTH_LOGGED_IN_SUCCESS'
export const AUTH_LOGGED_OUT_SUCCESS = 'AUTH_LOGGED_OUT_SUCCESS'

export function attemptLogin() {
  return (dispatch) => {
    FirebaseAPI.signInWithPopup()
      .then((result) => {
        dispatch(userCreated(result.user));
      }).catch(function(error) {
        console.log('login failed', error)
      })
  };
}

export function userCreated(user) {
  return (dispatch) => {
    const options = { 
      path: '/users/' + user.uid, 
      value: extractUserProperties(user)
    }
    FirebaseAPI.set(options)
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
    const options = {
      path: '/users',
      key: userUID
    }
    FirebaseAPI.GetChildAddedByKeyOnce(options)
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

export function signOut() {
  return (dispatch, getState) => {
    return FirebaseAPI.signOut()
      .then(() => {
        dispatch(authLoggedOutSuccess())
        dispatch(push('/'))
      })
      .catch((error) => {
        console.log(error)
      })
  };
}

export function authLoggedOutSuccess() {
  return {
    type: AUTH_LOGGED_OUT_SUCCESS
  }
}