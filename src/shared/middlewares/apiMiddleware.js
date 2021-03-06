import config from 'shared/configs';

require('es6-promise').polyfill();
import 'isomorphic-fetch';

import { normalize } from 'normalizr'

export const apiURL = `http://${config.host}${config.host === 'localhost' ? ':' + config.port : ''}/api`;

function callApi(url, options) {
  return fetch(url, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        const { status, statusText } = response;
        return Promise.reject({
          status, 
          statusText
        });
      }
      return json;
    });
}

export default store => next => action => {

  const { type, request, callback, schema, ...rest } = action;
  if (!request) return next(action);

  const { path, options = {} } = request;
  if (!path) return next(action);

  const DONE = type;
  const REQUEST = `${type}_REQUEST`;
  const FAIL = `${type}_FAIL`;

  next({...rest, type: REQUEST });

  if (
      options.method === 'POST' ||
      options.method === 'PUT' ||
      options.method === 'PATCH'
    ) {
    options.headers = {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    options.body = JSON.stringify(options.body);
  }

  return callApi(`${apiURL}${path}`, options)
    .then(
      data => {
        let response = data
        if (schema != undefined) {
          response = normalize(data, schema)
        }
        let result = next({
          ...rest,
          type: DONE,
          response
        });
        if (typeof callback === 'function') {
          return callback(data, store.dispatch);
        }
        return result;
      },
      error => {
        return next({
          ...rest,
          type: FAIL,
          error
        });
      }
    );
};