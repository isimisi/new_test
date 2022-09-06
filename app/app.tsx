// Import all the third party stuff

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router/immutable";
import FontFaceObserver from "fontfaceobserver";
import "sanitize.css/sanitize.css";

import "core-js/stable";
import "regenerator-runtime/runtime";

import "./styles/layout/base.scss";
import { ToastContainer } from "react-toastify";
import CookieBot from "react-cookiebot/lib/CookieBot";

import "react-toastify/dist/ReactToastify.min.css";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

// Load the favicon and the .htaccess file
import "!file-loader?name=[name].[ext]!../public/favicons/favicon.ico"; // eslint-disable-line
import "file-loader?name=.htaccess!./.htaccess"; // eslint-disable-line

import { isMobile } from "react-device-detect";
import App from "./containers/App";
import history from "./utils/history";
import store from "./redux/configureStore";
import "./i18n";
import Auth0ProviderWithHistory from "./containers/App/auth0-provider-with-history";
import ErrorView from "@components/Error/CrashScreen";

// bugsnag
if (process.env.NODE_ENV === "production") {
  Bugsnag.start({
    apiKey: "6d9a9a961530851d4c09cac9aa86ada6",
    plugins: [new BugsnagPluginReact()],
    appVersion: "1.4.88"
  });
}

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver("Open Sans", {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add("fontLoaded");
});

const domainGroupId = "e25f2e52-b958-4868-bb38-05482f232612";

// TODO: påsæt reux with loace storage så den bliver initeret med localstorage og jeg dermed aldrig skal kigge i locale storage
const MOUNT_NODE = document.getElementById("app");

// eslint-disable-next-line dot-notation
window["$crisp"] = [];
// eslint-disable-next-line dot-notation
window["CRISP_WEBSITE_ID"] = "66acbf35-9c41-485f-99dc-b7800897ea4a";

if (!isMobile) {
  // eslint-disable-next-line func-names
  (function () {
    const d = document;
    const s = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = true;
    d.getElementsByTagName("head")[0].appendChild(s);
  }());
}

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      {/* @ts-ignore - old react */}
      <ConnectedRouter history={history}>
        <Auth0ProviderWithHistory>
          <App history={history} />
          <ToastContainer />
        </Auth0ProviderWithHistory>
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
  );
};

if (process.env.NODE_ENV === "production") {
  // @ts-ignore
  const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);
  render = () => {
    ReactDOM.render(
      <>
        {/* @ts-ignore - old react */}
        <ErrorBoundary FallbackComponent={ErrorView}>
          <Provider store={store}>
            {/* @ts-ignore - old react */}
            <ConnectedRouter history={history}>
              <Auth0ProviderWithHistory>
                <App history={history} />
                <ToastContainer />
                <CookieBot domainGroupId={domainGroupId} />
              </Auth0ProviderWithHistory>
            </ConnectedRouter>
          </Provider>
        </ErrorBoundary>
      </>,
      MOUNT_NODE
    );
  };
}

render();
