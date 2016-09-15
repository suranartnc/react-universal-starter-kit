import { Entity } from 'draft-js'
import { LinkEntityType } from './LinkEntity'

const findEntityRanges = (character) => {
  const entityKey = character.getEntity()
  return entityKey !== null && Entity.get(entityKey).getType() === LinkEntityType
}

const LinkStrategy = (contentBlock, callback) => {
  contentBlock.findEntityRanges(findEntityRanges, callback)
}

export default LinkStrategy
