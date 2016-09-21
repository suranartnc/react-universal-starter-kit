import React, { Component, PropTypes } from 'react'
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey'
import _ from 'lodash'

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
    const processedTree = tree.map((leafSet, leafSetIndex) => {
      const leavesForLeafSet = leafSet.get('leaves')

      const leaves = leavesForLeafSet.map((leaf, leafIndex) => {
        const start = leaf.get('start')
        const end = leaf.get('end')

        const styleSet = block.getInlineStyleAt(start)
        let styleObj = styleSet.reduce((map, styleName) => {
          const mergedStyles = {}
          const style = this.props.customStyleMap[styleName]

          if (style !== undefined
              && map.textDecoration !== style.textDecoration
          ) {
            mergedStyles.textDecoration = [map.textDecoration, style.textDecoration].join(' ').trim()
          }

          return Object.assign(map, style, mergedStyles)
        }, {})

        const slicedText = text.slice(start, end)

        if (_.isEmpty(styleObj)) {
          return slicedText
        }

        const leafKey = DraftOffsetKey.encode(key, leafSetIndex, leafIndex)

        return (
          <span
            key={leafKey}
            style={styleObj}
          >
            {slicedText}
          </span>
        )
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
      const decoratorOffsetKey = DraftOffsetKey.encode(key, leafSetIndex, 0)

      const decoratedText = text.slice(
        leavesForLeafSet.first().get('start'),
        leavesForLeafSet.last().get('end')
      )

      return (
        <DecoratorComponent
          key={decoratorOffsetKey}
          offsetKey={decoratorOffsetKey}
          entityKey={block.getEntityAt(leafSet.get('start'))}
          decoratedText={decoratedText}
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
  customStyleMap: PropTypes.object.isRequired,
}

export default HtmlRenderer
