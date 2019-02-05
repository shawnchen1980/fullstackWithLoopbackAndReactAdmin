import React from "react";
import {
  fetchUtils,
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser
} from "react-admin";
// import jsonServerProvider from 'ra-data-json-server';
import Login from "./components/Login";
import { withRouter } from "react-router-dom";
import customRoutes from "./route";
import layout from "./Layout";
import {
  WordbookList,
  WordbookShow,
  WordbookEdit,
  WordbookCreate
} from "./components/Wordbook";
import userReducer from "./features/User/state";
// const dataProvider = jsonServerProvider('http://localhost:3000/api');
import loopbackClient from "react-admin-loopback";
import { authProvider } from "./AuthProvider/authProvider";
import createHistory from "history/createBrowserHistory";
import setUserSaga from "./features/User/saga";
import chineseMessages from "./lang/chinese";

const history = createHistory({ basename: "/" });
const messages = {
  cn: chineseMessages
};
const i18nProvider = locale => messages[locale];
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = JSON.parse(localStorage.getItem("lbtoken"));
  if (token && token.value && token.value.id) {
    options.headers.set("Authorization", `Bearer ${token.value.id}`);
  }
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = loopbackClient("http://localhost:3000/api", httpClient);
const auth = authProvider("http://localhost:3000/api/Users/login");
//http://localhost:3000/api/Users/login
const App = () => (
  <Admin
    loginPage={Login}
    history={history}
    appLayout={layout}
    customRoutes={customRoutes}
    customReducers={{ user: userReducer }}
    customSagas={[setUserSaga]}
    locale="cn"
    i18nProvider={i18nProvider}
    dataProvider={dataProvider}
    authProvider={auth}
  >
    <Resource
      name="Wordbooks"
      list={WordbookList}
      show={WordbookShow}
      edit={WordbookEdit}
      create={WordbookCreate}
    />
  </Admin>
);

export default App;
