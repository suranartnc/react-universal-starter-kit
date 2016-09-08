import { combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'
import entityReducer from './entityReducer'
import pageReducer from './pageReducer'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  routing: routerReducer,
  entities: entityReducer,
  pages: pageReducer,
  form: formReducer,
})

export default rootReducer
