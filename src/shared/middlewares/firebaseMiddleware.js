import { FirebaseAPI, normalize } from 'shared/utils/firebaseUtils';

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

  return FirebaseAPI[method](options)
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