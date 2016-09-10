import firebase from 'firebase';
import firebaseConfig from 'shared/configs/firebase';

function normalize(snapshot, schema) {
  
  let response = null
  let result = []

  if (schema.type === 'list') {
    snapshot.forEach((childSnapshot) => {
      result.push(childSnapshot.key)
    })
  } else {
    result = snapshot.key
  }

  if (snapshot.val() !== null) {
    response = {
      entities: {
        [schema.entities]: {
          [result]: snapshot.val()
        }
      },
      result
    }
  }
  return response
}

export default (store) => (next) => (action) => {

  const { type, database, callback, ...rest } = action;
  if (!database) return next(action);

  const { 
    method,
    path,
    schema
  } = database;

  if (!path) return next(action);

  const REQUEST = `${type}_REQUEST`;
  const DONE = type;
  const FAILED = `${type}_FAILED`;

  next({...rest, type: REQUEST });

  return firebase
    .database()
    .ref(path)
    .orderByKey()
    .once('value')
    .then((snapshot) => {
      const response = normalize(snapshot, schema)
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