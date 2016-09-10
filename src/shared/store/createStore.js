import { createStore, applyMiddleware, compose  } from 'redux';

import thunk from 'redux-thunk';
import firebaseMiddleware from 'shared/middlewares/firebaseMiddleware';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from 'shared/reducers/rootReducer';

export default (history, initialState) => {
  
	const middlewares = [
    thunk,
    firebaseMiddleware,
    routerMiddleware(history)
  ];

  let enhancer = applyMiddleware(...middlewares);

  if (process.env.BROWSER && process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    enhancer = compose(enhancer, window.devToolsExtension());
  }

  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  )

  if (module.hot) {
    module.hot.accept('shared/reducers/rootReducer', () => {
      const nextReducer = require('shared/reducers/rootReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
