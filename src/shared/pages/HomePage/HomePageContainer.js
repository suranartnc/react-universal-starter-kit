import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as postActions from 'shared/modules/post/postActions';

import HomePage from './HomePage';

class HomePageContainer extends Component {

  static prefetchData = [
    () => postActions.getPostLatest()
  ]

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(postActions.getPostLatest())
  }

  render() {
    return (
      <HomePage posts={this.props.posts} />
    );
  }
}

function mapStateToProps({ post }) {
  return {
    posts: post.latest
  }
}

HomePageContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tags: PropTypes.array
  })).isRequired
}

export default connect(mapStateToProps)(HomePageContainer);