import React from 'react';
import { render } from 'react-dom';
import { browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from 'shared/store/createStore';
import getRoutes from 'shared/routes';
import Root from 'shared/Root';

const initialState = window.__INITIAL_STATE__
const store = createStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);
const routes = getRoutes(store)
const mountNode = document.getElementById('root');

match({ history, routes }, (error, redirectLocation, renderProps) => {
  render(
    <Root {...renderProps} store={store} />,
    mountNode
  );
})