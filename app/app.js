/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
// Import root app
import App from 'containers/App';
import './styles/layout/base.scss';
import { ToastContainer } from 'react-toastify';

import CookieBot from 'react-cookiebot/lib/CookieBot';

import 'react-toastify/dist/ReactToastify.min.css';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!../public/favicons/favicon.ico'; // eslint-disable-line
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line

import LogRocket from 'logrocket';
import { isMobile } from 'react-device-detect';
import store from './redux/configureStore';

import './i18n';

import 'video-react/dist/video-react.css';

//  logrocket
LogRocket.init('pm66tw/juristic-web-app');

// bugsnag
if (process.env.NODE_ENV === 'production') {
  Bugsnag.start({
    apiKey: '6d9a9a961530851d4c09cac9aa86ada6',
    plugins: [new BugsnagPluginReact()]
  });
} // import css

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const domainGroupId = 'e25f2e52-b958-4868-bb38-05482f232612';

// Create redux store with history

// TODO: påsæt reux with loace storage så den bliver initeret med localstorage og jeg dermed aldrig skal kigge i locale storage
const MOUNT_NODE = document.getElementById('app');

// Include the Crisp code here, without the <script></script> tags
window.$crisp = [];
window.CRISP_WEBSITE_ID = '66acbf35-9c41-485f-99dc-b7800897ea4a';

if (!isMobile) {
  // eslint-disable-next-line func-names
  (function () {
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://client.crisp.chat/l.js';
    s.async = 1;
    d.getElementsByTagName('head')[0].appendChild(s);
  }());
}

const persistor = persistStore(store);

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <App />
          <ToastContainer />
        </ConnectedRouter>
      </PersistGate>
    </Provider>,
    MOUNT_NODE
  );
};

if (process.env.NODE_ENV === 'production') {
  const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

  render = () => {
    ReactDOM.render(
      <ErrorBoundary>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
            <ToastContainer />
            <CookieBot domainGroupId={domainGroupId} />
          </ConnectedRouter>
        </Provider>
      </ErrorBoundary>,
      MOUNT_NODE
    );
  };
}

render();
