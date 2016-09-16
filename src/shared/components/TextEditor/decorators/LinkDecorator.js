import React from 'react'
import { Entity } from 'draft-js'
import linkifyIt from 'linkify-it'
import tlds from 'tlds'

const linkify = linkifyIt()
linkify.tlds(tlds)

export const LinkEntityType = 'LINK'

export const LinkEntity = (props) => {
  const { entityKey, decoratedText, children} = props

  let url = decoratedText
  if (entityKey !== null) {
    url = Entity.get(entityKey).getData().url
  }
  url = url.trim()

  return (
    <a href={url} target="_blank" rel="nofollow">
      {children}
    </a>
  )
}

export const LinkStrategy = (contentBlock, callback) => {
  filterByEntityType(contentBlock, callback)
  filterByPlainText(contentBlock, callback)
}

function filterByEntityType(contentBlock, callback) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return entityKey !== null && Entity.get(entityKey).getType() === LinkEntityType
  }, callback)
}

function filterByPlainText(contentBlock, callback) {
  const links = linkify.match(contentBlock.getText())
  if (links !== null) {
    links.forEach((link) => {
      callback(link.index, link.lastIndex)
    })
  }
}

export default {
  strategy: LinkStrategy,
  component: LinkEntity,
}
