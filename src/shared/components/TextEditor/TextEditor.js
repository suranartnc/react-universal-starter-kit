import React, { Component, PropTypes } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import InlineStyleControls from './InlineStyleControls/InlineStyleControls'

const INLINE_STYLES = [
  {label: 'B', style: 'BOLD'},
  {label: 'I', style: 'ITALIC'},
]

class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  onChange = (editorState) => {
    this.setState({
      editorState
    })

    const html = stateToHTML(editorState.getCurrentContent())
    this.props.onChange(html)
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)

    if (newState) {
      this.onChange(newState)
      return true
    }

    return false
  }

  toggleInlineStyle = (inlineStyle) => {
    const newState = RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    this.onChange(newState)
  }

  render() {
    return (
      <div>
        <div>
          <InlineStyleControls
            editorState={this.state.editorState}
            onToggle={this.toggleInlineStyle} />
        </div>

        <Editor editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand} />
      </div>
    )
  }
}

TextEditor.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default TextEditor
