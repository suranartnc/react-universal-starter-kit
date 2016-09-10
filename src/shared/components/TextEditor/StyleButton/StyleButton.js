import React, { Component, PropTypes } from 'react'

class StyleButton extends Component {
  onToggle = (e) => {
    e.preventDefault()
    this.props.onToggle(this.props.style)
  }

  render() {
    const className = this.props.active ? 'stylebutton--active' : 'stylebutton'

    return (
      <button type="button" className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </button>
    )
  }
}

StyleButton.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default StyleButton
