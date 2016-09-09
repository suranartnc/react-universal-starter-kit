import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import createStore from 'shared/store/createStore'
import getRoutes from 'shared/routes'
import prefetchData from './prefetchData'

import config from '../../src/shared/configs'

import firebase from 'firebase';
import firebaseApi from 'shared/utils/firebase'
import firebaseConfig from 'shared/configs/firebase'

firebase.initializeApp(firebaseConfig)

const wdsPath = `http://${config.host}:${config.wdsPort}/build/`
const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets)

const renderPage = (reactComponents, initialState) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>React Universal Starter Kit</title>
      ${process.env.NODE_ENV === 'production' ? '<link rel="stylesheet" href="' + assetsManifest.app.css + '" />' : ''}
    </head>
    <body>
      <div id="root">${reactComponents}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      ${process.env.NODE_ENV === 'production' ?
        `
          <script src="${assetsManifest.vendor.js}"></script>
          <script src="${assetsManifest.app.js}"></script>
        `
        : `<script src="${wdsPath + 'main.js'}"></script>`
      }
    </body>
  </html>
`)

export default function(req, res) {

  const store = createStore()
  const routes = getRoutes(store)

  match({
    location: req.url,
    routes
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps && renderProps.components) {
      prefetchData(store.dispatch, renderProps.components, renderProps.params)
        .then(() => {
          const initialState = store.getState()        
          const reactComponents = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );
          res.end(renderPage(reactComponents, initialState));
        })
    } else {
      res.status(404).send('Not found');
    }
  })
}