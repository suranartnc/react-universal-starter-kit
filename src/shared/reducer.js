import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import _ from 'lodash'
import * as postActions from 'shared/modules/post/actionTypes'

const initialEntities = {
  posts: {}
}

const emptyList = []

function entities(state = initialEntities, action) {
  if (action.response && action.response.entities) {
    return _.merge({}, state, action.response.entities)
  }
  return state
}

function homePageReducer(state = emptyList, action) {
  switch(action.type) {
    case postActions.POST_GET_LATEST:
      if (action.response && action.response.result) {
        return action.response.result
      }
      return state
    default:
      return state
  }
}

const pageReducer = combineReducers({
  home: homePageReducer
})


const rootReducer = combineReducers({
  routing: routerReducer,
  entities: entities,
  pages: pageReducer
})

export default rootReducer