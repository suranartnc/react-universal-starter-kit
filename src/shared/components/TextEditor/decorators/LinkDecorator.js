import React from 'react'
import { Entity } from 'draft-js'

export const LinkEntityType = 'LINK'

export const LinkEntity = ({ entityKey, children}) => {
  const { url } = Entity.get(entityKey).getData()

  return (
    <a href={url}>
      {children}
    </a>
  )
}

export const LinkStrategy = (contentBlock, callback) => {
  contentBlock.findEntityRanges(findEntityRanges, callback)
}

function findEntityRanges(character) {
  const entityKey = character.getEntity()
  return entityKey !== null && Entity.get(entityKey).getType() === LinkEntityType
}

export default {
  strategy: LinkStrategy,
  component: LinkEntity,
}
