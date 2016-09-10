import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { getPostLatest } from 'shared/modules/post/postActions';
import { selectPostsInHomePage } from 'shared/modules/post/postSelectors'

import HomePage from './HomePage';

class HomePageContainer extends Component {

  static prefetchData = [
    () => getPostLatest()
  ]

  componentDidMount() {
    const { dispatch, postsInHomepage } = this.props
    if (postsInHomepage.length === 0) {
      dispatch(getPostLatest())
    }
  }

  render() {
    return (
      <HomePage posts={this.props.postsInHomepage} />
    );
  }
}

function mapStateToProps(state) {
  return {
    postsInHomepage: selectPostsInHomePage(state)
  }
}

HomePageContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  postsInHomepage: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tags: PropTypes.array
  })).isRequired
}

export default connect(mapStateToProps)(HomePageContainer);