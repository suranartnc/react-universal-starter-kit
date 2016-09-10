import React, { Component, PropTypes } from 'react'
import { Editor, EditorState } from 'draft-js'
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

  render() {
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    )
  }
}

WriteEditor.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default WriteEditor
