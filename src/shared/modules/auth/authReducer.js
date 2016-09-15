import {
  AUTH_LOGIN,
  AUTH_LOGOUT
} from 'shared/modules/auth/authActions'

const initialState = {
  isLogged: false,
  currentUserUID: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {

    case AUTH_LOGIN:
      return {
        ...state,
        isLogged: true,
        currentUserUID: action.userUID
      }

    case AUTH_LOGOUT:
      return {
        ...state,
        isLogged: false,
        currentUserUID: null
      }

    default:
      return state
  }
}