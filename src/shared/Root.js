import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll/lib/useScroll';
import { syncHistoryWithStore } from 'react-router-redux';
import getRoutes from 'shared/routes';

const Root = ({ store, ...renderProps }) => {
  const history = syncHistoryWithStore(browserHistory, store);  
  const routes = getRoutes(store)
  return (
    <Provider store={store} key="provider">
      <Router 
        {...renderProps}
        history={history}
        routes={routes}
        render={applyRouterMiddleware(useScroll())} />
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;