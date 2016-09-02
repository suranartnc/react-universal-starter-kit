import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as postActions from 'shared/modules/post/postActions';

import EntryPage from './EntryPage';

class EntryPageContainer extends Component {

  static prefetchData = [
    (params) => postActions.getPostById(params.id)
  ]

  render() {
    return (
      <EntryPage post={this.props.post} />
    );
  }
}

function mapStateToProps(state, props) {

  const {
    entities: { posts }
  } = state

  const id = props.params.id
  const post = posts[id]

  return {
    post
  }
}

EntryPageContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string
  })
}

export default connect(mapStateToProps)(EntryPageContainer);