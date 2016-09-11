import { combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'
import entityReducer from './entityReducer'
import pageReducer from './pageReducer'

import userReducer from 'shared/modules/user/userReducer'
import authReducer from 'shared/modules/auth/authReducer'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  routing: routerReducer,
  entities: entityReducer,
  pages: pageReducer,
  user: userReducer,
  auth: authReducer,
  form: formReducer
})

export default rootReducer
