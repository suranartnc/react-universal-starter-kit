import React, { Component, PropTypes } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

class WriteEditor extends Component {
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
      return 'handled'
    }

    return 'not-handled'
  }

  render() {
    return (
      <Editor editorState={this.state.editorState}
        onChange={this.onChange}
        handleKeyCommand={this.handleKeyCommand} />
    )
  }
}

WriteEditor.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default WriteEditor
