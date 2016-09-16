import React, { Component, PropTypes } from 'react'
import { RichUtils, Entity } from 'draft-js'
import { LinkEntityType } from '../../decorators/LinkDecorator'

import styles from './LinkControl.scss'

class LinkControl extends Component {
  state = {
    showLinkInput: false,
    linkValue: '',
  }

  renderLinkButton() {
    const selection = this.props.editorState.getSelection()
    const disabled = selection.isCollapsed()

    return (
      <button type="button"
        className="btn btn-default"
        disabled={disabled}
        onClick={this.toggleLink}
      >
        Link
      </button>
    )
  }

  toggleLink = () => {
    this.setState({
      showLinkInput: true
    }, () => {
      setTimeout(() => this.refs.url.focus(), 0) // this trick from draft-js link example
    })
  }

  renderLinkInput() {
    if (! this.state.showLinkInput) {
      return null
    }

    return <input type="url"
      ref="url"
      value={this.state.linkValue}
      onChange={this.onLinkChange}
      onKeyDown={this.onLinkInputKeyDown}
      className={`form-control ${styles.input}`}
      placeholder="Paste or type a link" />
  }

  onLinkChange = (e) => {
    this.setState({
      linkValue: e.target.value
    })
  }

  onLinkInputKeyDown = (e) => {
    if (e.which === 13) {
      return this.submitLinkInput(e)
    }
  }

  submitLinkInput = (e) => {
    e.preventDefault()

    const { editorState } = this.props

    const entityKey = Entity.create(LinkEntityType, 'MUTABLE', { url: this.state.linkValue })

    this.props.onChange(RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey))

    this.setState({
      showLinkInput: false,
      linkValue: '',
    })
  }

  render() {
    return (
      <div className="btn-group" role="group">
        {this.renderLinkButton()}
        {this.renderLinkInput()}
      </div>
    )
  }
}

LinkControl.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default LinkControl
