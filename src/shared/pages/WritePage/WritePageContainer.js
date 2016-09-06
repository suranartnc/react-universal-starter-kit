import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { createNewPost } from 'shared/modules/post/postActions'
import WritePage from './WritePage'

class WritePageContainer extends Component {
  
  onFormSubmit = (data) => {
    this.props.dispatch(createNewPost(data))
    this.context.router.push('/')
  }

  render() {
    return <WritePage onFormSubmit={this.onFormSubmit} />
  }
}

WritePageContainer.contextTypes = {
  router: PropTypes.object
}

export default connect()(WritePageContainer)