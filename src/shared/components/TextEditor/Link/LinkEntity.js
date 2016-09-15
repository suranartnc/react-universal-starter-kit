import React from 'react'
import { Entity } from 'draft-js'

export const LinkEntityType = 'LINK'

const LinkEntity = ({ entityKey, children}) => {
  const { url } = Entity.get(entityKey).getData()

  return (
    <a href="{url}">
      {children}
    </a>
  )
}

export default LinkEntity
