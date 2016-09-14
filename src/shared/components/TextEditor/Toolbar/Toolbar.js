import React, { Component, PropTypes } from 'react'
import { RichUtils } from 'draft-js'
import InlineStyleButtons from './InlineStyleButtons'
import BlockTypeButtons from './BlockTypeButtons'

const BLOCK_TYPE_BUTTONS = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'Blockquote', style: 'blockquote'},
]

class Toolbar extends Component {
  render() {
    return (
      <div className="btn-toolbar" role="toolbar">
        <InlineStyleButtons {...this.props} />
        <BlockTypeButtons {...this.props} />
      </div>
    )
  }
}

Toolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Toolbar
