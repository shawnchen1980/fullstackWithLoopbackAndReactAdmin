//in reducers.js
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { adminReducer, i18nReducer, USER_LOGOUT } from "react-admin";

import wordbookReducer from "./features/Wordbook/state";
import userReducer from "./features/User/state";

import defaultMessages from "ra-language-english";
import chineseMessages from "./lang/chinese";

const messages = {
  cn: chineseMessages
};
const i18nProvider = locale => {
  if (locale !== "en") {
    return messages[locale];
  }
  return defaultMessages;
};
//this is where to change language settings.
const locale = "cn";

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

export default resettableAppReducer;
