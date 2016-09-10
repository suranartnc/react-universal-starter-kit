import firebase from 'firebase';
import firebaseApi from 'shared/utils/firebase'
import firebaseConfig from 'shared/configs/firebase';

import { normalize } from 'normalizr'

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
    database: {
      method: 'get',
      options: {
        path: '/posts/',
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

export function createNewPostInStore(response) {
  return {
    type: POST_CREATE,
    response
  };
}

export function createNewPost(data) {

  const uid = firebase.auth().currentUser.uid
  const newPostKey = firebase.database().ref().child('posts').push().key;

  data.id = newPostKey
  data.uid = uid

  const updates = {};
  updates['/posts/' + newPostKey] = data;
  updates['/user-posts/' + uid + '/' + newPostKey] = data;

  return {
    type: POST_CREATE,
    database: {
      method: 'update',
      options: {
        data
      }
    }
  }

  return (dispatch) => {
    // const uid = firebase.auth().currentUser.uid
    // const newPostKey = firebase.database().ref().child('posts').push().key;

    // data.id = newPostKey
    // data.uid = uid

    // const updates = {};
    // updates['/posts/' + newPostKey] = data;
    // updates['/user-posts/' + uid + '/' + newPostKey] = data;

    firebase.database().ref().update(updates)
      .then(() => {
        const response = normalize(data, postSchema)
        dispatch(createNewPostInStore(response))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}