import { FirebaseAPI, extractUserProperties } from 'shared/utils/firebaseUtils'
import { push } from 'react-router-redux'

export const AUTH_INITIALIZE = 'AUTH_INITIALIZE'
export const AUTH_CREATE_USER = 'AUTH_CREATE_USER'
export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

export function authInitialized(user) {
  return (dispatch) => {
    dispatch(authInitializedDone())
    if (user) {
      dispatch(authLoad(user))
    } else {
      dispatch(authLogOut())
    }
  };
}

export function authInitializedDone() {
  return {
    type: AUTH_INITIALIZE
  }
}

export function authLoad(user) {
  return (dispatch) => {
    dispatch(authLogIn(user.id))
    dispatch(authLoadUser(user))
  }
}

export function authLoadUser(user) {
  return {
    type: AUTH_CREATE_USER, 
    user: extractUserProperties(user)
  };
}

export function authLogIn(userUID) {
  return {
    type: AUTH_LOGIN, 
    userUID
  };
}

export function authLogOut() {
  return {
    type: AUTH_LOGOUT
  }
}

export function logIn() {
  return (dispatch) => {
    FirebaseAPI.signInWithPopup()
      .then((result) => {
        dispatch(createUser(result.user))
        dispatch(authLoad(result.user))
      }).catch(function(error) {
        console.log('signin failed', error)
      })
  };
}

export function createUser(user) {
  return {
    type: AUTH_CREATE_USER,
    database: {
      method: 'set',
      options: {
        path: '/users/' + user.uid,
        value: extractUserProperties(user)
      }
    }
  }
}

export function logOut() {
  return (dispatch, getState) => {
    return FirebaseAPI.signOut()
      .then(() => {
        dispatch(authLogOut())
        dispatch(push('/'))
      })
      .catch((error) => {
        console.log(error)
      })
  };
}