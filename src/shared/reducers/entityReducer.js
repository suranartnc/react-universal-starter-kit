const initialEntities = {
  posts: {}
}

function entityReducer(state = initialEntities, action) {
  if (action.response && action.response.entities) {
    return {...state, ...action.response.entities}
  }
  return state
}

export default entityReducer