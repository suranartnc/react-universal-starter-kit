import React, { Component, PropTypes } from 'react'
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey'

class HtmlRenderer extends Component {
  renderBlocks() {
    const { editorState } = this.props

    const contentState = editorState.getCurrentContent()
    const decorator = editorState.getDecorator()

    const blocks = contentState.getBlocksAsArray()
    return blocks.map((block) => this.processBlock(block, decorator))
  }

  processBlock(block, decorator) {
    const key = block.getKey()

    const text = block.getText()

    const tree = this.props.editorState.getBlockTree(key)
    const processedTree = tree.map((leafSet) => {
      const leavesForLeafSet = leafSet.get('leaves')

      const leaves = leavesForLeafSet.map((leaf) => {
        const start = leaf.get('start')
        const end = leaf.get('end')
        return text.slice(start, end)
      }).toArray()

      const decoratorKey = leafSet.get('decoratorKey')
      if (! decoratorKey) {
        return leaves
      }

      if (! decorator) {
        return leaves
      }

      const DecoratorComponent = decorator.getComponentForKey(decoratorKey)
      if (! DecoratorComponent) {
        return leaves
      }

      const decoratorProps = decorator.getPropsForKey(decoratorKey)
      const decoratorOffsetKey = DraftOffsetKey.encode(key, decoratorKey, 0)

      return (
        <DecoratorComponent
          key={decoratorOffsetKey}
          entityKey={block.getEntityAt(leafSet.get('start'))}
          {...decoratorProps}
        >
          {leaves}
        </DecoratorComponent>
      )
    }).toArray()

    const Element = this.getBlockElement(block)
    return <Element key={key}>{processedTree}</Element>
  }

  getBlockElement(block) {
    const { blockRenderMap } = this.props
    const configForType = blockRenderMap.get(block.getType())

    return configForType.element || blockRenderMap.get('unstyled').element
  }

  render() {
    return (
      <div>{this.renderBlocks()}</div>
    )
  }
}

HtmlRenderer.propTypes = {
  editorState: PropTypes.object.isRequired,
  blockRenderMap: PropTypes.object.isRequired,
}

export default HtmlRenderer