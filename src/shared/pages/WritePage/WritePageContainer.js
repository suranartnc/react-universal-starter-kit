import React, { Component } from 'react'
import { connect } from 'react-redux'

import WritePage from './WritePage'

class WritePageContainer extends Component {
  render() {
    return <WritePage />
  }
}

export default connect()(WritePageContainer)