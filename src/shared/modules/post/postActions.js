export const POST_GET_LATEST = 'POST_GET_LATEST'
export const POST_GET_BY_ID = 'POST_GET_BY_ID'
export const POST_CREATE = 'POST_CREATE'

import { 
  postSchema,
  postArraySchema
} from './postSchemas'

export function getPostLatest(limit = 20) {
  return {
    type: POST_GET_LATEST,
    request: {
      path: `/posts?_sort=id&_order=DESC&_limit=${limit}`
    },
    schema: postArraySchema
  };
}

export function getPostById(id) {
  return {
    type: POST_GET_BY_ID,
    request: {
      path: `/posts/${id}`
    },
    schema: postSchema
  };
}

export function createNewPost(data) {
  return {
    type: POST_CREATE,
    request: {
      path: '/posts',
      options: {
        method: 'POST',
        body: data
      }
    },
    schema: postSchema
  };
}