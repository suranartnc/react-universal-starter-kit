import React, { Component, PropTypes } from 'react'
import { RichUtils } from 'draft-js'
import { INLINE_STYLE_BUTTONS } from './ToolbarConfig'
import StyleButton from './StyleButton'

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

  render() {
    return (
      <div className="btn-toolbar" role="toolbar">
        {this.renderInlineStyleButtons()}
      </div>
    )
  }
}

Toolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Toolbar
