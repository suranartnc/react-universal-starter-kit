import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import createStore from 'shared/store/createStore';
import Root from 'shared/Root';

const initialState = window.__INITIAL_STATE__
const store = createStore(browserHistory, initialState);
const mountNode = document.getElementById('root');

render(
	<Root store={store} />,
  mountNode
);