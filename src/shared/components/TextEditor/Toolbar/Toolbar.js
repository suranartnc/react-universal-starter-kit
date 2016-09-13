import React, { Component, PropTypes } from 'react'
import { RichUtils } from 'draft-js'
import StyleButton from './StyleButton'

const INLINE_STYLE_BUTTONS = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
]

const BLOCK_TYPE_BUTTONS = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'Blockquote', style: 'blockquote'},
]

class Toolbar extends Component {
  renderInlineStyleButtons() {
    const currentStyle = this.props.editorState.getCurrentInlineStyle()

    let buttons = INLINE_STYLE_BUTTONS.map(({ label, style}) => (
        <StyleButton
          key={label}
          label={label}
          style={style}
          isActive={currentStyle.has(style)}
          onToggle={this.toggleInlineStyle}
        />
    ))

    return (
      <div className="btn-group" role="group">
        {buttons}
      </div>
    )
  }

  toggleInlineStyle = (inlineStyle) => {
    this.props.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    )
  }

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

    return (
      <div className="btn-group" role="group">
        {buttons}
      </div>
    )
  }

  toggleBlockType = (blockType) => {
    this.props.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    )
  }

  getCurrentBlockType() {
    const { editorState } = this.props
    const selection = editorState.getSelection()
    return editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()
  }

  render() {
    return (
      <div className="btn-toolbar" role="toolbar">
        {this.renderInlineStyleButtons()}
        {this.renderBlockTypeButtons()}
      </div>
    )
  }
}

Toolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Toolbar
