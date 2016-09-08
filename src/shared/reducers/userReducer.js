import {
  USER_LOADED_SUCCESS,
  USER_IS_ADMIN_SUCCESS,
  AUTH_LOGGED_OUT_SUCCESS
} from 'shared/modules/user/userActions'

const initialState = {
  isAdmin: undefined
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED_SUCCESS:
      return Object.assign({}, state, action.user);

    case USER_IS_ADMIN_SUCCESS:
      return Object.assign({}, state, {isAdmin: true});

    case AUTH_LOGGED_OUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
}