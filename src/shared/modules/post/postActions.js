export const POST_GET_LATEST = 'POST_GET_LATEST';
export const POST_GET_BY_ID = 'POST_GET_BY_ID';

import { 
  postSchema,
  postArraySchema
} from './postSchemas'

export function getPostLatest(limit = 20) {
  return {
    type: POST_GET_LATEST,
    request: {
      path: `/posts?_limit=${limit}`
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