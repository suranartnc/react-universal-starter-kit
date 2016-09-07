import React from 'react'
import { storiesOf } from '@kadira/storybook'
import faker from 'faker'
import Post from 'shared/components/Post/Post'

const post = {
  id: 1,
  title: faker.lorem.sentence(),
  excerpt: faker.lorem.paragraphs(2),
  body: faker.lorem.paragraphs(10),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  avatar: faker.image.avatar(),
  tags: faker.lorem.sentence().replace('.', '').split(''),
  pubDate: '2 hours ago'
}

storiesOf('Post', module)
  .add('default', () => (
    <Post post={post} />
  ))
