import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { fetchUtils } from "react-admin";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import createAdminStore from "./createAdminStore";
import routeConvertor from "./utilities/RouteConvert";
import loopbackClient from "./DataProvider";
import { authProvider } from "./DataProvider/authProvider";
import createHistory from "history/createBrowserHistory";
import defaultMessages from "ra-language-english";
import chineseMessages from "./lang/chinese";
const history = createHistory({ basename: "/" });
const messages = {
  cn: chineseMessages
};
const i18nProvider = locale => {
  if (locale !== "en") {
    return messages[locale];
  }
  return defaultMessages;
};
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = JSON.parse(localStorage.getItem("lbtoken"));
  if (token && token.value && token.value.id) {
    options.headers.set("Authorization", ` ${token.value.id}`);
  }
  return fetchUtils.fetchJson(url, options);
};
let API_URL;
if (process.env.NODE_ENV === "development") {
  API_URL = "http://localhost:3000/api";
} else {
  API_URL = "/api";
}
const dataProvider = routeConvertor(loopbackClient("API_URL", httpClient));
const auth = authProvider(`${API_URL}/Users/login`, history);

const store = createAdminStore({
  authProvider: auth,
  dataProvider,
  i18nProvider,
  history,
  locale: "cn"
});

ReactDOM.render(<App />, document.getElementById("root"));

// if (module.hot) {
//   module.hot.accept("./App", () => {
//     const NextApp = require("./App").default;
//     ReactDOM.render(<NextApp />, document.getElementById("root"));
//   });
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
