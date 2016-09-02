import * as actionTypes from './actionTypes';
import { 
  postSchema,
  postArraySchema
} from './postSchemas'

export function getPostLatest(limit = 20) {
  return {
    type: actionTypes.POST_GET_LATEST,
    request: {
      path: `/posts?_limit=${limit}`
    },
    schema: postArraySchema
  };
}

export function getPostById(id) {
  return {
    type: actionTypes.POST_GET_BY_ID,
    request: {
      path: `/posts/${id}`
    },
    schema: postSchema
  };
}