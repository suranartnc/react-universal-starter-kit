import React from 'react'
import { storiesOf } from '@kadira/storybook'
import faker from 'faker'
import EntryContent from 'shared/pages/EntryPage/EntryContent/EntryContent'

const post = {
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraphs(10),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  avatar: faker.image.avatar(),
  pubDate: '2 hours ago',
}

storiesOf('EntryContent', module)
  .add('default', () => (
    <EntryContent post={post} />
  ))
