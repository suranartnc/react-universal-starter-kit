import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'shared/pages/App/App';

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
          cb(null, require('shared/pages/HomePage/HomePageContainer').default);
        }, 'home');
      }}
    />
    <Route
      path="post/:id"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('shared/pages/EntryPage/EntryPageContainer').default);
        }, 'entry');
      }}
    />
  </Route>
)