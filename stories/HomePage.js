import React from 'react'
import { storiesOf } from '@kadira/storybook'
import faker from 'faker'
import HomePage from 'shared/pages/HomePage/HomePage'
import App from 'shared/pages/App/App'

const posts = [];
for (let i = 0; i < 5; ++i) {
  posts.push({
    id: i + 1,
    title: faker.lorem.sentence(),
    excerpt: faker.lorem.paragraphs(2),
    body: faker.lorem.paragraphs(10),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    avatar: faker.image.avatar(),
    tags: faker.lorem.sentence().replace('.', '').split(''),
    pubDate: '2 hours ago'
  })
}

storiesOf('Home Page', module)
  .addDecorator((story) => (
    <App children={story()} />
  ))
  .add('default', () => (
    <HomePage posts={posts} />
  ))
