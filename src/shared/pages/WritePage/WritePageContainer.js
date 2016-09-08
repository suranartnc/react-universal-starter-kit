import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { createNewPost } from 'shared/modules/post/postActions'
import WritePage from './WritePage'

import faker from 'faker'

class WritePageContainer extends Component {

  onFormSubmit = (data) => {
    // mock missing post data
    data.excerpt = `${data.body.substring(0, 20)}...`
    data.name = `${faker.name.firstName()} ${faker.name.lastName()}`
    data.avatar = faker.image.avatar()
    data.tags = data.title.split(' ')
    data.pubDate = 'now'

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
