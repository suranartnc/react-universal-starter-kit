import React, { Component, PropTypes } from 'react'

import {Editor, EditorState, ContentState, RichUtils} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

class WriteEditor extends Component {

  state = {
    editorState: EditorState.createEmpty()
  }

  onChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    ));
  }

  onSave = () => {
    let html = stateToHTML(this.state.editorState.getCurrentContent());
    console.log(html)
  }

  render() {
    const {editorState} = this.state;
    return (
      <div>
        <button onClick={this.onBoldClick}>Bold</button>
        <div className="editor">
          <Editor
            editorState={editorState}
            onChange={this.onChange} />
        </div>
        <button onClick={this.onSave}>Save</button>
      </div>   
    )
  }
}

WriteEditor.propTypes = {
  onChange: PropTypes.func
};

export default WriteEditor