import React, { Component, PropTypes } from 'react'
import { RichUtils } from 'draft-js'
import StyleButton from './StyleButton'

const INLINE_STYLE_BUTTONS = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
]

const BLOCK_TYPE_BUTTONS = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'Blockquote', style: 'blockquote'},
]

class Toolbar extends Component {
  state = {
    showLinkInput: false,
    linkValue: '',
  }

  renderInlineStyleButtons() {
    const currentStyle = this.props.editorState.getCurrentInlineStyle()

    let buttons = INLINE_STYLE_BUTTONS.map(({ label, style}) => (
        <StyleButton
          key={label}
          label={label}
          style={style}
          isActive={currentStyle.has(style)}
          onToggle={this.toggleInlineStyle}
        />
    ))

    return buttons
  }

  toggleInlineStyle = (inlineStyle) => {
    this.props.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    )
  }

  renderBlockTypeButtons() {
    const blockType = this.getCurrentBlockType()

    let buttons = BLOCK_TYPE_BUTTONS.map(({ label, style }) => (
      <StyleButton
        key={label}
        label={label}
        style={style}
        isActive={style === blockType}
        onToggle={this.toggleBlockType}
      />
    ))

    return buttons
  }

  getCurrentBlockType() {
    const selection = this.getCurrentSelection()
    return this.props.editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()
  }

  getCurrentSelection() {
    const { editorState } = this.props
    return editorState.getSelection()
  }

  toggleBlockType = (blockType) => {
    this.props.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    )
  }

  renderLinkButton() {
    return (
      <div>
        <button className="btn btn-default"
          disabled={! this.hasSelection() && 'disabled'}
          onMouseDown={this.toggleLink}
        >
          Link
        </button>
        {this.state.showLinkInput && this.renderLinkInput()}
      </div>
    )
  }

  hasSelection() {
    const selection = this.getCurrentSelection()
    return ! selection.isCollapsed()
  }

  toggleLink = () => {
    // TODO:
    // - check current block already has a link or not for toggle url input or unlink
    // - close link input
    this.promptForLink()
  }

  promptForLink = () => {
    this.setState({
      showLinkInput: true
    }, () => {
      // this trick from draft-js link example
      setTimeout(() => this.refs.url.focus(), 0)
    })
  }

  renderLinkInput() {
    return (
      <input ref="url"
        type="url"
        className="form-control"
        placeholder="Paste or type a link"
        onChange={this.onLinkChange}
        onKeyDown={this.onLinkInputKeyDown} />
    )
  }

  onLinkChange = (e) => {
    this.setState({
      linkValue: e.target.value
    })
  }

  onLinkInputKeyDown = (e) => {
    if (e.which === 13) {
      this.confirmLink(e)
    }
  }

  confirmLink = (e) => {
    e.preventDefault()
    console.log(this.state.linkValue)

    // TODO:
    // - validate link
    // - create entity type link with draft-js decorator
  }

  render() {
    // TODO: find a way to render link button along with link input

    return (
      <div className="btn-toolbar" role="toolbar">
        <div className="btn-group" role="group">
          {this.renderInlineStyleButtons()}
          {this.renderLinkButton()}
        </div>
        <div className="btn-group" role="group">
          {this.renderBlockTypeButtons()}
        </div>
      </div>
    )
  }
}

Toolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Toolbar
