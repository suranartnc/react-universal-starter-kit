import React, { Component, PropTypes } from 'react'

import RichTextEditor from 'react-rte'

class WriteEditor extends Component {

  state = {
    value: RichTextEditor.createEmptyValue()
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  render() {
    return (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
      />
    )
  }
}

WriteEditor.propTypes = {
  onChange: PropTypes.func
};

export default WriteEditor