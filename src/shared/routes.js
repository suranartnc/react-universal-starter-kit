import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'shared/containers/App/App';

if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('shared/containers/HomePage/HomePage').default);
        }, 'home');
      }}
    />
    <Route
      path="post/:id"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('shared/containers/EntryPage/EntryPage').default);
        }, 'entry');
      }}
    />
  </Route>
)