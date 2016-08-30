import { createStore, applyMiddleware } from 'redux';

import apiMiddleware from 'shared/middlewares/apiMiddleware';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from 'shared/reducer';

export default (history, initialState) => {
  
	const middlewares = [
    apiMiddleware, 
    routerMiddleware(history)
  ];

  const enhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  )

  if (module.hot) {
    module.hot.accept('shared/reducer', () => {
      System.import('shared/reducer').then(nextRootReducer =>
        store.replaceReducer(nextRootReducer.default)
      )
    })
  }

  return store;
}
