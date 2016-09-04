import { combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'
import entityReducer from './entityReducer'
import pageReducer from './pageReducer'

const rootReducer = combineReducers({
  routing: routerReducer,
  entities: entityReducer,
  pages: pageReducer
})

export default rootReducer