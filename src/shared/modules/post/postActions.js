import { FirebaseAPI } from 'shared/utils/firebaseUtils'

export const POST_GET_LATEST = 'POST_GET_LATEST'
export const POST_GET_BY_ID = 'POST_GET_BY_ID'
export const POST_CREATE = 'POST_CREATE'

import {
  postSchema,
  postArraySchema
} from './postSchemas'

export function getPostLatest() {
  return {
    type: POST_GET_LATEST,
    database: {
      method: 'get',
      options: {
        path: '/posts/',
        sortBy: 'pubDateInverse',
        schema: {
          entities: 'posts',
          type: 'list'
        }
      } 
    }
  }
}

export function getPostById(id) {
  return {
    type: POST_GET_BY_ID,
    database: {
      method: 'get',
      options: {
        path: `/posts/${id}`,
        schema: {
          entities: 'posts'
        }
      }
    }
  }
}

export function createNewPost(data) {

  const firebaseUser = FirebaseAPI.getCurrentUser()
  const newPostKey = FirebaseAPI.createNewKey('posts')
  const uid = firebaseUser.uid

  data.id = newPostKey
  data.uid = uid
  data.name = firebaseUser.displayName
  data.avatar = firebaseUser.photoURL

  const updates = {};
  updates['/posts/' + newPostKey] = data;
  updates['/user-posts/' + uid + '/' + newPostKey] = data;

  return {
    type: POST_CREATE,
    database: {
      method: 'update',
      options: {
        data,
        updates,
        schema: {
          entities: 'posts'
        }
      }
    }
  }
}