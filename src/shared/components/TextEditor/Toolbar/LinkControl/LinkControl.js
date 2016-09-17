import React, { Component, PropTypes } from 'react'
import { RichUtils, Entity } from 'draft-js'
import { LinkEntityType } from 'shared/components/TextEditor/decorators/LinkDecorator'
import {
  getEntityKeyAtCurrentSelection,
  getEntitySelectionState,
} from 'shared/components/TextEditor/helpers'

import styles from './LinkControl.scss'

class LinkControl extends Component {
  state = {
    showLinkInput: false,
    linkValue: '',
  }

  renderLinkButton() {
    const selection = this.props.editorState.getSelection()
    let disabled = selection.isCollapsed()

    let onClick = this.promptForLink
    let className = 'btn btn-default'
    if (this.isAlreadyALink()) {
      disabled = false
      onClick = this.removeLink
      className = 'btn btn-primary active'
    }

    return (
      <button type="button"
        className={className}
        disabled={disabled}
        onClick={onClick}
      >
        Link
      </button>
    )
  }

  isAlreadyALink() {
    const entityKey = getEntityKeyAtCurrentSelection(this.props.editorState)
    if (entityKey === null) {
      return false
    }

    return Entity.get(entityKey).getType() === LinkEntityType
  }

  promptForLink = () => {
    this.setState({
      showLinkInput: true
    }, () => {
      setTimeout(() => this.refs.url.focus(), 0) // this trick from draft-js link example
    })
  }

  removeLink = () => {
    const { editorState, onChange } = this.props

    const entityKey = getEntityKeyAtCurrentSelection(editorState)
    const selectionState = getEntitySelectionState(editorState, entityKey)

    onChange(RichUtils.toggleLink(editorState, selectionState, null))
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
