import { FirebaseAPI, extractUserProperties } from 'shared/utils/firebaseUtils'
import { push } from 'react-router-redux'
import reactCookie from 'react-cookie';

import { AUTH_TOKEN } from 'shared/configs/auth';

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
    dispatch(authLogIn(user.uid))
    dispatch(authLoadUser(user))
  }
}

export function authLoadUser(user) {
  return {
    type: AUTH_CREATE_USER, 
    user: user
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
    FirebaseAPI.signInWithPopup('facebook')
      .then((result) => {
        dispatch(createUser(result.user))
        firebase.database()
          .ref('/users/' + result.user.uid)
          .once('value')
          .then((snapshot) => {
            dispatch(authLoad(snapshot.val()))
          })
          .catch((error) => {
            console.log(error)
          })
        FirebaseAPI.getCurrentUserToken()
          .then(function(idToken) {
            reactCookie.save(AUTH_TOKEN, idToken);
          })
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
        reactCookie.remove(AUTH_TOKEN);
        dispatch(authLogOut())
        dispatch(push('/'))
      })
      .catch((error) => {
        console.log(error)
      })
  };
}