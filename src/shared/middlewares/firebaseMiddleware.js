import firebase from 'firebase';
import firebaseConfig from 'shared/configs/firebase';

function normalize(snapshot, schema) {
  
  let response = null
  let result = []

  if (snapshot.val() !== null) {
    if (schema.type === 'list') {
      snapshot.forEach((childSnapshot) => {
        result.push(childSnapshot.key)
      })
      response = {
        entities: {
          [schema.entities]: snapshot.val()
        }
      }
    } else {
      result = snapshot.key
      response = {
        entities: {
          [schema.entities]: {
            [result]: snapshot.val()
          }
        }
      }
    }
    response.result = result
  }
  return response
}

class firebaseApi {

  static get({ path }) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .once('value')
  }

  static update({ updates }) {
    return firebase
      .database()
      .ref()
      .update(updates)
  }
}

export default (store) => (next) => (action) => {

  const { type, database, ...rest } = action;
  if (!database) return next(action);

  const { 
    method,
    options
  } = database;

  const REQUEST = `${type}_REQUEST`;
  const DONE = type;
  const FAILED = `${type}_FAILED`;

  next({...rest, type: REQUEST });

  return firebaseApi[method](options)
    .then((snapshot) => {
      let response = null
      if (options.schema) {
        if (method === 'update') {
          response = {
            entities: {
              [options.schema.entities]: {
                [options.data.id]: options.data
              }
            },
            result: options.data.id
          }
        } else {
          response = normalize(snapshot, options.schema)
        }
      }
      return next({
        ...rest,
        type: DONE,
        response
      });
    })
    .catch((error) => {
      return next({
        ...rest,
        type: FAILED,
        error
      });
    })
}