import {
  AUTH_INITIALIZATION_DONE,
  AUTH_LOGGED_IN_SUCCESS,
  AUTH_LOGGED_OUT_SUCCESS
} from 'shared/modules/user/userActions'

const initialState = {
  isLogged: false,
  currentUserUID: null,
  initialized: false
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_INITIALIZATION_DONE:
      return Object.assign({}, state, {initialized: true});

    case AUTH_LOGGED_IN_SUCCESS:
      return Object.assign({}, state, {
        isLogged: true,
        currentUserUID: action.userUID
      });

    case AUTH_LOGGED_OUT_SUCCESS:
      return Object.assign({}, state, {
        isLogged: false,
        currentUserUID: null
      });
    default:
      return state;
  }
}