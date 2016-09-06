import { combineReducers } from 'redux'
import { POST_GET_LATEST, POST_CREATE } from 'shared/modules/post/postActions'

const emptyList = []

const initialState = {
  home: emptyList
}

function updatePageState(page, state, action) {
  if (action.response && action.response.result) {
    return {
      ...state,
      [page]: action.response.result
    }
  }
  return state
}

function pageReducer(state = initialState, action) {
  switch(action.type) {
    case POST_GET_LATEST:
      return updatePageState('home', state, action)
    case POST_CREATE:
      return {
        ...state,
        home: [action.response.result].concat(state.home)
      }
    default:
      return state
  }
}

export default pageReducer