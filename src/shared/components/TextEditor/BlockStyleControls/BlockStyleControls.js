import React, { PropTypes } from 'react'
import StyleButton from '../StyleButton/StyleButton'

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'Blockquote', style: 'blockquote'},
]

const BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className="btn-group" role="group">
      {BLOCK_TYPES.map(({ label, style }) => (
        <StyleButton key={label}
          active={style === blockType}
          label={label}
          onToggle={onToggle}
          style={style} />
      ))}
    </div>
  )
}

BlockStyleControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default BlockStyleControls
