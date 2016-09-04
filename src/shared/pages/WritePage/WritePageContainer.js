import React, { Component } from 'react'
import { connect } from 'react-redux'

import WritePage from './WritePage'

class WritePageContainer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <WritePage />
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(WritePageContainer)