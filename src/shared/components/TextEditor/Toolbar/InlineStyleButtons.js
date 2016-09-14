import React, { PropTypes, Component } from 'react'
import { RichUtils } from 'draft-js'
import StyleButton from './StyleButton'

class InlineStyleButtons extends Component {
  INLINE_STYLE_BUTTONS = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
  ]

  toggleInlineStyle = (inlineStyle) => {
    const newEditorState = RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    this.props.onChange(newEditorState)
  }

  renderButtons() {
    const currentStyle = this.props.editorState.getCurrentInlineStyle()

    return this.INLINE_STYLE_BUTTONS.map(({ label, style}) => (
      <StyleButton
       key={label}
       label={label}
       style={style}
       isActive={currentStyle.has(style)}
       onToggle={this.toggleInlineStyle} />
    ))
  }

  render() {
    return <div className="btn-group" role="group">{this.renderButtons()}</div>
  }
}

InlineStyleButtons.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default InlineStyleButtons
