import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import merge from 'lodash/merge'

function entities(state = { posts: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

const rootReducer = combineReducers({
  routing: routerReducer,
  entities: entities
})

export default rootReducer