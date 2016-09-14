import React, { Component, PropTypes } from 'react'
import { RichUtils } from 'draft-js'
import StyleButton from './StyleButton'

class BlockTypeButtons extends Component {
  BLOCK_TYPE_BUTTONS = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'Blockquote', style: 'blockquote'},
  ]

  toggleBlockType = (blockType) => {
    const newEditorState = RichUtils.toggleBlockType(this.props.editorState, blockType)
    this.props.onChange(newEditorState)
  }

  renderButtons() {
    const { editorState } = this.props
    const selection = editorState.getSelection()
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()

    return this.BLOCK_TYPE_BUTTONS.map(({ label, style }) => (
      <StyleButton
        key={label}
        label={label}
        style={style}
        isActive={style === blockType}
        onToggle={this.toggleBlockType} />
    ))
  }

  render() {
    return <div className="btn-group" role="group">{this.renderButtons()}</div>
  }
}

BlockTypeButtons.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default BlockTypeButtons
