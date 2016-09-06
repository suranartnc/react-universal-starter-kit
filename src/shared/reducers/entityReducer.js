import _ from 'lodash'

const initialEntities = {
  posts: {}
}

function entityReducer(state = initialEntities, action) {
  if (action.response && action.response.entities) {
    return _.merge({}, state, action.response.entities)
  }
  return state
}

export default entityReducer