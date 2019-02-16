import React, { Component } from "react";
import {
  fetchUtils,
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser
} from "react-admin";
import MyResource from "./components/CurrentWordList";
// import jsonServerProvider from 'ra-data-json-server';
import defaultMessages from "ra-language-english";
import { Provider } from "react-redux";
import Login from "./components/Login";
import { withRouter } from "react-router-dom";
import customRoutes from "./route";
import layout from "./Layout";
import {
  WordbookList,
  WordbookShow,
  WordbookEdit,
  WordbookCreate,
  WordbookListHoc
} from "./components/Wordbook";
import { WordCreate } from "./components/Word";
import { WordTests } from "./components/WordTests";
import userReducer from "./features/User/state";
import wordbookReducer from "./features/Wordbook/state";
import routeConvertor from "./utilities/RouteConvert";
// const dataProvider = jsonServerProvider('http://localhost:3000/api');
//import loopbackClient from "react-admin-loopback";
import loopbackClient from "./DataProvider";
import { authProvider } from "./DataProvider/authProvider";
import createHistory from "history/createBrowserHistory";
import setUserSaga from "./features/User/saga";
import chineseMessages from "./lang/chinese";
import createAdminStore from "./createAdminStore";

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
const dataProvider = routeConvertor(
  loopbackClient("http://localhost:3000/api", httpClient)
);
const auth = authProvider("http://localhost:3000/api/Users/login", history);
//http://localhost:3000/api/Users/login

class App extends Component {
  state = { currentWordbook: "" };
  setCurrentWordbook = v => {
    this.setState({ currentWordbook: v });
  };
  render() {
    console.log("app this.setcurrentwordbook!", this.setCurrentWordbook);
    const WList = WordbookListHoc(this.setCurrentWordbook);

    return (
      <Provider
        store={createAdminStore({
          authProvider: auth,
          dataProvider,
          i18nProvider,
          history,
          locale: "cn"
        })}
      >
        <Admin
          loginPage={Login}
          history={history}
          appLayout={layout}
          customRoutes={customRoutes}
          authProvider={auth}
        >
          {/* <Resource
          name="Wordbooks"
          list={WordbookList}
          show={WordbookShow}
          edit={WordbookEdit}
          create={WordbookCreate}
        /> */}
          <Resource
            name="Wordbooks"
            list={WList}
            show={WordbookShow}
            edit={WordbookEdit}
            create={WordbookCreate}
          />

          <Resource
            name={`WordsFromBooks/${this.state.currentWordbook}/words`}
            list={ListGuesser}
            show={ShowGuesser}
            edit={EditGuesser}
            create={WordCreate}
          />
          <Resource
            name={`testsfrombooks/${this.state.currentWordbook}/words`}
            list={WordTests}
          />
          {/* <MyResource /> */}
        </Admin>
      </Provider>
    );
  }
}
export default App;
