import React, { Component, PropTypes } from 'react'
import { Editor, EditorState, RichUtils, CompositeDecorator } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

import Toolbar from './Toolbar/Toolbar'

import LinkDecorator from './decorators/LinkDecorator'

import styles from './TextEditor.scss'

const decorator = new CompositeDecorator([
  LinkDecorator
])

class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(decorator)
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

  render() {
    const { editorState } = this.state

    return (
      <div>
        <Toolbar editorState={editorState} onChange={this.onChange} />

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
