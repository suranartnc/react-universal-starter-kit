import React, { Component, PropTypes } from 'react'
import { RichUtils } from 'draft-js'
import InlineStyleButtons from './InlineStyleButtons'
import StyleButton from './StyleButton'

const BLOCK_TYPE_BUTTONS = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'Blockquote', style: 'blockquote'},
]

class Toolbar extends Component {
  renderBlockTypeButtons() {
    const blockType = this.getCurrentBlockType()

    let buttons = BLOCK_TYPE_BUTTONS.map(({ label, style }) => (
      <StyleButton
        key={label}
        label={label}
        style={style}
        isActive={style === blockType}
        onToggle={this.toggleBlockType}
      />
    ))

    return buttons
  }

  getCurrentBlockType() {
    const selection = this.getCurrentSelection()
    return this.props.editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()
  }

  getCurrentSelection() {
    const { editorState } = this.props
    return editorState.getSelection()
  }

  toggleBlockType = (blockType) => {
    this.props.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    )
  }

  render() {
    return (
      <div className="btn-toolbar" role="toolbar">
        <InlineStyleButtons {...this.props} />
        <div className="btn-group" role="group">
          {this.renderBlockTypeButtons()}
        </div>
      </div>
    )
  }
}

Toolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Toolbar
