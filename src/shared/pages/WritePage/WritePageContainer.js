import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { createNewPost } from 'shared/modules/post/postActions'
import WritePage from './WritePage'

import _ from 'lodash'

class WritePageContainer extends Component {

  onFormSubmit = (data) => {
    let excerpt = data.body.replace(/<(?:.|\n)*?>/gm, '') // TODO: find better way to strip html tags
    excerpt = _.truncate(excerpt, {
      length: 30
    })

    const now = (new Date).getTime()
    data.excerpt = excerpt
    data.tags = data.title.split(' ')
    data.pubDate = now
    data.pubDateInverse = 0 - now

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
