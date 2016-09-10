import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { createNewPost } from 'shared/modules/post/postActions'
import WritePage from './WritePage'

import _ from 'lodash'
import faker from 'faker'

class WritePageContainer extends Component {

  onFormSubmit = (data) => {
    let excerpt = data.body.replace(/<(?:.|\n)*?>/gm, '') // TODO: find better way to strip html tags
    excerpt = _.truncate(excerpt, {
      length: 30
    })

    // mock missing post data
    data.excerpt = excerpt
    data.name = `${faker.name.firstName()} ${faker.name.lastName()}`
    data.avatar = faker.image.avatar()
    data.tags = data.title.split(' ')
    data.pubDate = -(new Date).getTime()

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
