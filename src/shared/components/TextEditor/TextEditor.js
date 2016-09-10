import React, { Component, PropTypes } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import InlineStyleControls from './InlineStyleControls/InlineStyleControls'
import BlockStyleControls from './BlockStyleControls/BlockStyleControls'
import styles from './TextEditor.scss'

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

  onFocus = (e) => {
    this.refs.editor.focus()
    this.props.onFocus(e)
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

  toggleBlockType = (blockType) => {
    const newState = RichUtils.toggleBlockType(this.state.editorState, blockType)
    this.onChange(newState)
  }

  render() {
    console.log(styles)

    const { editorState } = this.state

    return (
      <div>
        <div className="btn-toolbar" role="toolbar">
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle} />

          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType} />
        </div>

        <div className={styles.editor} onClick={this.onFocus}>
          <Editor ref="editor"
            editorState={editorState}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.props.onBlur}
            handleKeyCommand={this.handleKeyCommand} />
        </div>
      </div>
    )
  }
}

TextEditor.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default TextEditor
