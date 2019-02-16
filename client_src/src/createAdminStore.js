// in src/createAdminStore.js
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import formMiddleware from "ra-core/lib/form/formMiddleware";
import {
  adminReducer,
  adminSaga,
  createAppReducer,
  defaultI18nProvider,
  i18nReducer,
  USER_LOGOUT
} from "react-admin";

import wordbookReducer from "./features/Wordbook/state";
import userReducer from "./features/User/state";
import setUserSaga from "./features/User/saga";

import defaultMessages from "ra-language-english";
import chineseMessages from "./lang/chinese";
import reducers from "./reducers";
const messages = {
  cn: chineseMessages
};
const i18nProvider = locale => {
  if (locale !== "en") {
    return messages[locale];
  }
  return defaultMessages;
};

export default ({
  authProvider,
  dataProvider,
  i18nProvider = defaultI18nProvider,
  history,
  locale = "en"
}) => {
  const reducer = combineReducers({
    admin: adminReducer,
    i18n: i18nReducer(locale, i18nProvider(locale)),
    form: formReducer,
    router: routerReducer,
    user: userReducer,
    currentWordbook: wordbookReducer
  });
  const resettableAppReducer = (state, action) =>
    reducer(action.type !== USER_LOGOUT ? state : undefined, action);

  const saga = function* rootSaga() {
    yield all(
      [
        adminSaga(dataProvider, authProvider, i18nProvider),
        setUserSaga
        // add your own sagas here
      ].map(fork)
    );
  };
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    resettableAppReducer,
    //reducers,
    {
      /* set your initial state here */
    },
    compose(
      applyMiddleware(
        sagaMiddleware,
        formMiddleware,
        routerMiddleware(history)
        // add your own middlewares here
      ),
      typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
      // add your own enhancers here
    )
  );
  sagaMiddleware.run(saga);

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./reducers", () => {
        store.replaceReducer(reducers);
      });
    }
  }
  return store;
};
