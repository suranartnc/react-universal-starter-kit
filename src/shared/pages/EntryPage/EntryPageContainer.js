import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { getPostById } from 'shared/modules/post/postActions';
import { selectPostInEntryPage } from 'shared/modules/post/postSelectors'

import EntryPage from './EntryPage';

class EntryPageContainer extends Component {

  static prefetchData = [
    (params) => getPostById(params.id)
  ]

  render() {
    return (
      <EntryPage post={this.props.post} />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    post: selectPostInEntryPage(state, props)
  }
}

EntryPageContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string
  })
}

export default connect(mapStateToProps)(EntryPageContainer);