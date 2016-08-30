import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll/lib/useScroll';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from 'shared/routes';

const Root = ({ store }) => {
  const history = syncHistoryWithStore(browserHistory, store);  

  return (
    <Provider store={store} key="provider">
      <Router 
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