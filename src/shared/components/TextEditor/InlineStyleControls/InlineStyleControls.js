import React, { PropTypes } from 'react'
import StyleButton from '../StyleButton/StyleButton'

const INLINE_STYLES = [
  {label: 'B', style: 'BOLD'},
  {label: 'I', style: 'ITALIC'},
]

const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle()

  return (
    <div className="btn-group" role="group">
      {INLINE_STYLES.map(({ label, style}) => (
        <StyleButton key={label}
          active={currentStyle.has(style)}
          label={label}
          style={style}
          onToggle={onToggle} />
      ))}
    </div>
  )
}

InlineStyleControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired
}

export default InlineStyleControls
