import { createSelector } from 'reselect'
import { getEntities, getPage, mapListWithEntity } from 'shared/utils/selectors'
import { makeTimeReadable } from 'shared/utils/timeUtils'

export const selectPostsInHomePage = createSelector(
  [
    getPage('home'),
    getEntities('posts')
  ],
  (home, posts) => {
    for (let i in posts) {
      posts[i].pubDateReadable = makeTimeReadable(posts[i].pubDate)
    }
    return mapListWithEntity(home, posts)
  }
)

export const selectPostInEntryPage = (state, props) => {
  const posts = getEntities('posts')(state)
  const id = props.params.id
  posts[id].pubDateReadable = makeTimeReadable(posts[id].pubDate)
  return posts[id]
}