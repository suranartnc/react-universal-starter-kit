import { createSelector } from 'reselect'
import { getEntities, getPage, mapListWithEntity } from 'shared/utils/selectors'

export const selectPostsInHomePage = createSelector(
  [
    getPage('home'),
    getEntities('posts')
  ],
  (home, posts) => mapListWithEntity(home, posts)
)

export const selectPostInEntryPage = (state, props) => {
  const posts = getEntities('posts')(state)
  const id = props.params.id
  return posts[id]
}