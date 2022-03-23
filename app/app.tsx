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
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import CryptoJS from "crypto-js";
import Lottie from "lottie-react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import logo from "@images/logo.svg";
// Load the favicon and the .htaccess file
import "!file-loader?name=[name].[ext]!../public/favicons/favicon.ico"; // eslint-disable-line
import "file-loader?name=.htaccess!./.htaccess"; // eslint-disable-line

import LogRocket from "logrocket";
import { isMobile } from "react-device-detect";
import App from "./containers/App";
import history from "./utils/history";
import store from "./redux/configureStore";
import "./i18n";
import Auth0ProviderWithHistory from "./containers/App/auth0-provider-with-history";
import { Trans, useTranslation } from "react-i18next";
import question from "@lotties/racoon/question.json";
import ButtonBase from "@material-ui/core/ButtonBase";

//  logrocket

// bugsnag

LogRocket.init("pm66tw/juristic-web-app");
Bugsnag.start({
  apiKey: "6d9a9a961530851d4c09cac9aa86ada6",
  plugins: [new BugsnagPluginReact()]
});

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver("Open Sans", {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add("fontLoaded");
});

const domainGroupId = "e25f2e52-b958-4868-bb38-05482f232612";

// Create redux store with history

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

const persistor = persistStore(store);
// @ts-ignore
const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

interface ErrorProps {
  clearError: () => void;
  error: Error;
  info: React.ErrorInfo;
}

const ErrorView = ({ clearError, error, info }: ErrorProps) => {
  const { t } = useTranslation();
  const errorCode = CryptoJS.AES.encrypt(
    error.name.toString(),
    "errorCode"
  ).toString();

  return (
    <Paper
      style={{
        padding: 24,
        display: "flex",
        position: "relative"
      }}
    >
      <ButtonBase
        style={{
          position: "absolute",
          left: 20,
          top: 20
        }}
        onClick={clearError}
      >
        <img src={logo} alt="juristic" style={{ width: 100 }} />
      </ButtonBase>
      <Lottie animationData={question} />
      <div
        style={{
          marginLeft: 50,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          maxWidth: 400
        }}
      >
        <div>
          <Typography
            variant="h1"
            style={{ marginTop: 20, textAlign: "center" }}
          >
            {t("500.oops")}
          </Typography>
          <Typography variant="h4" style={{ marginTop: 20 }}>
            {t("500.error_header")}
          </Typography>
          <Typography style={{ marginTop: 20 }}>
            {t("500.error_body")}
          </Typography>
          <Typography style={{ marginTop: 20 }}>
            <Trans
              i18nKey="500.error_body_quick" // optional -> fallbacks to defaults if not provided
              components={[
                <a
                  href={
                    "mailto: hej@juristic.io?subject=fejlkode: " + errorCode
                  }
                >
                  hej@juristic.io
                </a>
              ]}
            />
          </Typography>
          <Typography style={{ marginTop: 20, fontSize: 11 }}>
            {t("500.error_code", { errorCode })}
          </Typography>
        </div>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#73B1FF",
            color: "white",
            width: "50%",
            marginTop: 50
          }}
          onClick={clearError}
        >
          {t("404.go_back")}
        </Button>
      </div>
    </Paper>
  );
};

let render = () => {
  ReactDOM.render(
    <ErrorBoundary FallbackComponent={ErrorView}>
      {/* @ts-ignore */}
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Auth0ProviderWithHistory>
            <App />
            <ToastContainer />
            <CookieBot domainGroupId={domainGroupId} />
          </Auth0ProviderWithHistory>
        </ConnectedRouter>
      </Provider>
    </ErrorBoundary>,
    MOUNT_NODE
  );
};

if (process.env.NODE_ENV === "production") {
  render = () => {
    ReactDOM.render(
      <ErrorBoundary FallbackComponent={ErrorView}>
        {/* @ts-ignore */}
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Auth0ProviderWithHistory>
              <App />
              <ToastContainer />
              <CookieBot domainGroupId={domainGroupId} />
            </Auth0ProviderWithHistory>
          </ConnectedRouter>
        </Provider>
      </ErrorBoundary>,
      MOUNT_NODE
    );
  };
}

if (!window.Intl) {
  new Promise(resolve => {
    resolve(import("intl"));
  })
    .then(() =>
      Promise.all([
        import("intl/locale-data/jsonp/en.js"),
        import("intl/locale-data/jsonp/de.js")
      ])
    )
    .then(() => render())
    .catch(err => {
      throw err;
    });
} else {
  render();
}
