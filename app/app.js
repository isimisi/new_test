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

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!../public/favicons/favicon.ico'; // eslint-disable-line
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line

import LogRocket from 'logrocket';
import { isMobile } from 'react-device-detect';
import configureStore from './redux/configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

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
const initialState = {};
const { store } = configureStore(initialState, history);
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


let render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
          <ToastContainer />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (process.env.NODE_ENV === 'production') {
  const ErrorBoundary = Bugsnag.getPlugin('react')
    .createErrorBoundary(React);

  render = messages => {
    ReactDOM.render(
      <ErrorBoundary>
        <Provider store={store}>
          <LanguageProvider messages={messages}>
            <ConnectedRouter history={history}>
              <App />
              <ToastContainer />
              <CookieBot domainGroupId={domainGroupId} />
            </ConnectedRouter>
          </LanguageProvider>
        </Provider>
      </ErrorBoundary>,
      MOUNT_NODE,
    );
  };
}

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
      import('intl/locale-data/jsonp/de.js'),
    ])) // eslint-disable-line prettier/prettier
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}
// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }
