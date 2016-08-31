import { createStore, applyMiddleware, compose  } from 'redux';

import apiMiddleware from 'shared/middlewares/apiMiddleware';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from 'shared/reducer';

export default (history, initialState) => {
  
	const middlewares = [
    apiMiddleware, 
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
    module.hot.accept('shared/reducer', () => {
      const nextReducer = require('shared/reducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
