import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import postReducer from 'shared/modules/post/postReducer'

const rootReducer = combineReducers({
  routing: routerReducer,
  post: postReducer
})

export default rootReducer