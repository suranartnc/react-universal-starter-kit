import { combineReducers } from 'redux'
import { POST_GET_LATEST } from 'shared/modules/post/postActions'

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
    default:
      return state
  }
}

export default pageReducer