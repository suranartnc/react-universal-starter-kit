import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as postActions from 'shared/modules/post/postActions';

import HomePage from './HomePage';

class HomePageContainer extends Component {

  static prefetchData = [
    () => postActions.getPostLatest()
  ]

  componentDidMount() {
    const { dispatch, postsInHomepage } = this.props
    if (postsInHomepage.length === 0) {
      dispatch(postActions.getPostLatest())
    }
  }

  render() {
    return (
      <HomePage posts={this.props.postsInHomepage} />
    );
  }
}

function mapStateToProps(state) {

  const {
    pages: { home },
    entities: { posts }
  } = state

  const postsInHomepage = home.map(id => posts[id])

  return {
    postsInHomepage
  }
}

HomePageContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  postsInHomepage: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tags: PropTypes.array
  })).isRequired
}

export default connect(mapStateToProps)(HomePageContainer);