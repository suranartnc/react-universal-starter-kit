import { combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'
import entityReducer from './entityReducer'
import pageReducer from './pageReducer'
import userReducer from './userReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  routing: routerReducer,
  entities: entityReducer,
  pages: pageReducer,
  user: userReducer,
  auth: authReducer
})

export default rootReducer