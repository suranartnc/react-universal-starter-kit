import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as postActions from 'shared/modules/post/postActions';

import EntryPage from './EntryPage';

class EntryPageContainer extends Component {

  static prefetchData = [
    (params) => postActions.getPostById(params.id)
  ]

  componentDidMount() {
    const { dispatch, params: { id } } = this.props
    dispatch(postActions.getPostById(id));
  }

  render() {
    return (
      <EntryPage post={this.props.post} />
    );
  }
}

function mapStateToProps({ post }) {
  return {
    post: post.active
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
  }).isRequired
}

export default connect(mapStateToProps)(EntryPageContainer);