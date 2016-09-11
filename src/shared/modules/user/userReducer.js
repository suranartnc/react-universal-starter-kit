import {
  AUTH_CREATE_USER,
  AUTH_LOGOUT
} from 'shared/modules/auth/authActions'

const initialState = {}

export default function userReducer(state = initialState, action) {
  switch (action.type) {

    case AUTH_CREATE_USER:
      return {
        ...state,
        ...action.user
      }

    case AUTH_LOGOUT:
      return initialState;

    default:
      return state
  }
}