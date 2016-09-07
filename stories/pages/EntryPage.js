import React from 'react'
import { storiesOf } from '@kadira/storybook'
import faker from 'faker'
import EntryPage from 'shared/pages/EntryPage/EntryPage'
import EntryContent from 'shared/pages/EntryPage/EntryContent/EntryContent'
import App from 'shared/pages/App/App'

const post = {
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraphs(10),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  avatar: faker.image.avatar(),
  pubDate: '2 hours ago',
}

storiesOf('Entry Page', module)
  .add('default', () => {
    const component = <EntryPage post={post} />
    return <App children={component} />
  })
  .add('only EntryContent component', () => (
    <EntryContent post={post} />
  ))
