import React, { Component, PropTypes } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Editor, EditorState, RichUtils, CompositeDecorator, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import DefaultDraftBlockRenderMap from 'draft-js/lib/DefaultDraftBlockRenderMap'

import Toolbar from './Toolbar/Toolbar'
import HtmlRenderer from './HtmlRenderer'

import LinkDecorator from './decorators/LinkDecorator'

import styles from './TextEditor.scss'

const decorator = new CompositeDecorator([
  LinkDecorator
])

class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(decorator),
    html: '',
  }

  onChange = (editorState) => {
    const result = this.convertEditorState(editorState)

    this.setState({
      editorState,
      html: result.html,
    })


    const html = stateToHTML(editorState.getCurrentContent())
    this.props.onChange(html)
  }

  convertEditorState = (editorState) => {
    const contentState = editorState.getCurrentContent()

    const rawState = convertToRaw(contentState)

    return {
      raw: rawState,
      excerpt: contentState.getPlainText(),
      html: renderToStaticMarkup(<HtmlRenderer
        editorState={editorState}
        blockRenderMap={DefaultDraftBlockRenderMap} />),
    }
  }

  onFocus = (e) => {
    this.refs.editor.focus()
    this.props.onFocus(e)
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
        <div dangerouslySetInnerHTML={{__html: this.state.html}}>
        </div>
      </div>
    )
  }
}

TextEditor.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default TextEditor
