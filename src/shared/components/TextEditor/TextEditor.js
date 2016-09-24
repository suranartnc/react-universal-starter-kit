import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'

import styles from './TextEditor.scss'

class TextEditor extends Component {
  static propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (typeof document !== 'undefined') {
      this.createMediumEditor()
    }
  }

  createMediumEditor() {
    const MediumEditor = require('medium-editor')
    const dom = ReactDOM.findDOMNode(this)

    const { label, onChange } = this.props

    this.editor = new MediumEditor(dom, {
      toolbar: {
        buttons: [
          'bold', 'italic', 'underline', 'strikethrough',
          'anchor',
          'orderedlist', 'unorderedlist',
          'h1', 'h2', 'quote',
        ],
      },
      placeholder: {
        text: label,
        hideOnClick: false,
      },
      autoLink: true,
    })

    this.editor.subscribe('editableInput', (data, editable) => {
      onChange(dom.innerHTML)
    })
  }

  componentWillUmmount() {
    this.editor.destroy()
  }

  render() {
    return <div className={styles.editor} {...this.props } />
  }
}

export default TextEditor
